import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";
import { ChatPromptTemplate } from "langchain/prompts";
import { AIMessage, HumanMessage, SystemMessage } from "langchain/schema";

import { addDataForDay, getAllMsg, getOpenAIAPIKey, addMsg } from "../firebase_setup/FirebaseConfig.js";

//get api key from firebase
const chat_api_key = await getOpenAIAPIKey("openai_api_key");

//initialise chat model
const chatModel = new ChatOpenAI({
    openAIApiKey: chat_api_key,
    temperature: 0.5, //how creative it is allowed
    topP:0.5,
    frequencyPenalty: 0,
    presencePenalty: 0,
    maxTokens: 250,
})

//initialise chain with prompts
const INTRO_PROMPT = "You're paw paw, our welcoming memory companion. Encourage the user to open up and chat naturally. Make the introduction warm and inviting."
const CONVO_START_PROMPT = "Initiate a delightful conversation by asking the user about their day. Encourage them to share thoughts and experiences openly. Create an engaging and friendly atmosphere."
const CONVO_PROMPT = "Throughout our chat, be empathetic and understanding when the user shares their feelings and experiences. If anything is unclear, gently seek clarification or additional details. Wrap up conversations with gratitude and warmth, looking forward to the next interaction."
const RELEVANCE_PROMPT = "Emphasize the importance of meaningful conversations that revolve around the user's daily experiences, emotions, and cherished memories. Encourage the avoidance of unrelated topics, gently redirecting the conversation when necessary."

//initialise chats for the user today
let chatInput = [
    new SystemMessage(INTRO_PROMPT),
    new SystemMessage(CONVO_PROMPT),
    new SystemMessage(RELEVANCE_PROMPT),
]

//input to start the chat from AI
export const startChat = async(email, date) => {
    const startChatInput = [
        new SystemMessage(INTRO_PROMPT),
        new SystemMessage(CONVO_START_PROMPT)
    ];
    
    const startChatPrompt = ChatPromptTemplate.fromMessages(startChatInput);
    const startChatChain = new LLMChain({
        llm: chatModel,
        prompt: startChatPrompt,
    })
    
    const startChatData = await startChatChain.call({});
    chatInput.push(new AIMessage(startChatData.text))
    //text being the text
    addDataForDay(email, date, startChatData);
}

//get old responses
export const continueChat = async(email,date) => {
    const chats = await getAllMsg(email,date);
    chats.forEach((chat) => {
        if (chat.isUser) {
            chatInput.push(new HumanMessage(chat.content))
        } else {
            chatInput.push(new AIMessage(chat.content))
        }
    })
}

//function to receive human message, give response and store both to firebase
export const processHumanResponse = async(email, date, response, count) => {
    //add human response
    await addMsg(email,date, response, count, true);
    chatInput.push(new HumanMessage(response));

    //process human reponse to get ai response
    const chatPrompt = ChatPromptTemplate.fromMessages(chatInput);
    const chatChain = new LLMChain({
        llm: chatModel,
        prompt: chatPrompt,
    })
    const chatData = await chatChain.call({});

    //add ai response
    await addMsg(email,date, chatData.text, count+1, false);
    chatInput.push(new AIMessage(chatData.text))
}