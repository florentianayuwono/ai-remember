import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";
import { ChatPromptTemplate } from "langchain/prompts";
import { HumanMessage, SystemMessage } from "langchain/schema";

import { getOpenAIAPIKey } from "../firebase_setup/FirebaseConfig.js";

//get api key from firebase
const chat_api_key = await getOpenAIAPIKey("openai_api_key");

//initialise chat model
const chatModel = new ChatOpenAI({
    openAIApiKey: chat_api_key,
    temperature: 0.5, //how creative it is allowed
    topP:0.5,
    frequencyPenalty: 0,
    presencePenalty: 0
})

//initialise chain with prompts
const INTRO_PROMPT = "You are paw paw, a friendly memory companion. Engage with the user in a natural and empathetic conversation."
const CONVO_START_PROMPT = "Start a conversation with the user by asking about their day and encouraging them to share their experiences."
const CONVO_PROMPT = "When the user shares their feelings or experiences, respond with empathy and understanding. If the user's input is unclear or ambiguous, ask for clarification or additional details.When the conversation is concluding, express gratitude to the user and offer a pleasant farewell."
const RELEVANCE_PROMPT = "Prioritize relevant and meaningful conversations. Avoid engaging in topics or discussions that do not contribute to the user's memory journaling or emotional well-being. If the user introduces an unrelated or off-topic subject, gently guide the conversation back to the user's daily experiences, emotions, or memories."

//input to start the chat from AI
export const startChat = async() => {
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
    //text being the text
    return startChatData;
}


//initialise chats for the user today
let chat_input = [
    new SystemMessage(INTRO_PROMPT),
    new SystemMessage(CONVO_PROMPT),
    new SystemMessage(RELEVANCE_PROMPT),
]

//get and store the past chats


//get initial response and store response for chat model

//function to receive human message, give response and store to firebase
