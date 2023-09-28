import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";
import { ChatPromptTemplate,SystemMessagePromptTemplate } from "langchain/prompts";
import { AIMessage, HumanMessage, SystemMessage } from "langchain/schema";

import {
  addDataForDay,
  getAllMsg,
  getOpenAIAPIKey,
  addMsg,
  getSevenDaysDiary,
} from "../firebase_setup/FirebaseConfig.js";

//get api key from firebase
const chat_api_key = await getOpenAIAPIKey("openai_api_key");

//extraction schema
const extractionFunctionSchema = {
  name: "extractor",
  description: "Extracts fields from the input.",
  parameters: {
    type: "object",
    properties: {
      asking_for_past_events: {
        enum: [true, false],
        description:
          "Set this to 'true' if the previous response from the user is about events that have already occurred in the past; otherwise, set it to 'false' for future events or current events.",
      },
    },
    required: ["asking_for_past_events"],
  },
};

//initialise chat model
const chatModel = new ChatOpenAI({
  openAIApiKey: chat_api_key,
  temperature: 0.5, //how creative it is allowed
  topP: 0.5,
  frequencyPenalty: 0,
  presencePenalty: 0,
  maxTokens: 50,
});

//initialise chain with prompts
const INTRO_PROMPT =
  "You're paw paw, our welcoming memory companion, you are not a language model or AI. Encourage the user to open up and chat naturally. Make the introduction warm and inviting.";
const CONVO_START_PROMPT =
  "Initiate a delightful conversation by asking the user about their day. Encourage them to share thoughts and experiences openly. Create an engaging and friendly atmosphere.";
const RELEVANCE_PROMPT =
  "Emphasize the importance of meaningful conversations that revolve around the user's daily experiences, emotions, and cherished memories. Help user to retrieve past memories if necessary. Encourage the avoidance of unrelated topics, gently redirecting the conversation when necessary.";
const CONVO_PROMPT = `
Don't hesitate to use chat abbreviations like 'lol,' 'brb,' or 'omg' to keep the conversation light and fun!
Short and sweet is the way to go! Keep your messages to 1-3 sentences for a more natural chat flow.
Throughout our chat, be empathetic and understanding when the user shares their feelings and experiences. If anything is unclear, gently seek clarification or additional details.

`
  
//initialise chats for the user today
let chatInput = [
  new SystemMessage(INTRO_PROMPT),
  new SystemMessage(CONVO_PROMPT),
  new SystemMessage(RELEVANCE_PROMPT),
];

//input to start the chat from AI
export const startChat = async (email, date) => {
  const startChatInput = [
    new SystemMessage(INTRO_PROMPT),
    new SystemMessage(CONVO_START_PROMPT),
    new SystemMessage(CONVO_PROMPT),
  ];

  const startChatPrompt = ChatPromptTemplate.fromMessages(startChatInput);
  const startChatChain = new LLMChain({
    llm: chatModel,
    prompt: startChatPrompt,
  });

  const startChatData = await startChatChain.call({});
  let text = startChatData.text;
  text = text.slice(
    0,
    Math.max(
      text.lastIndexOf("!") + 1,
      text.lastIndexOf(".") + 1,
      text.lastIndexOf("?") + 1
    )
  );
  chatInput.push(new AIMessage(text));
  addDataForDay(email, date, text);
};

//get old responses
export const continueChat = async (email, date) => {
  const chats = await getAllMsg(email, date);
  chats.forEach((chat) => {
    if (chat.isUser) {
      chatInput.push(new HumanMessage(chat.content));
    } else {
      chatInput.push(new AIMessage(chat.content));
    }
  });
  if (chats.length % 2 === 0 && chats.length !== 0) {
    await addAIResponse(email,date, chats.length-1);
  }
};

//function to receive human message, give response and store both to firebase
export const processHumanResponse = async (email, date, response, count) => {
  //add human response
  await addMsg(email,date, response, (parseInt(count) -1).toString()+0, true);
  chatInput.push(new HumanMessage(response));

  addAIResponse(email,date,count);
};

const addAIResponse = async(email, date, count) => {
  //normal processing of human reponse to get ai response
  const chatPrompt = ChatPromptTemplate.fromMessages(chatInput);
  const chatChain = new LLMChain({
    llm: chatModel,
    prompt: chatPrompt,
  });
  const chatData = await chatChain.call({});
  let text = chatData.text;
  text = text.slice(
    0,
    Math.max(
      text.lastIndexOf("!") + 1,
      text.lastIndexOf(".") + 1,
      text.lastIndexOf("?") + 1
    )
  );
  //add ai response
  await addMsg(email, date, text, (count).toString()+0, false);
  chatInput.push(new AIMessage(text));

}


const GET_MEMORY_PROMPT = `
Current User Query: {response}

Collection of Past Memories of the user provided by the system: {diary}

Instructions to the AI:
1. Analyze the current user query and determine which item from the collection corresponds to the past memory most relevant to the query.
2. Retrieve the content of that memory and provide a detailed description tailored to the user's current mood or emotions.
`;

const askingForPastEvents = async(email, response) => {
    let chatInputCopy = [...chatInput];
    const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(GET_MEMORY_PROMPT);
    chatInputCopy.push(systemMessagePrompt);
    const diaries = await getSevenDaysDiary(email);
    const diary = diaries.join(`\n`);

    const chatPrompt = ChatPromptTemplate.fromMessages(chatInputCopy);
    const chatChain = new LLMChain({
      llm: chatModel,
      prompt: chatPrompt,
    });

    const chatData = await chatChain.call({
        diary: diary,
        response: response
    });
    let text = chatData.text;
}
