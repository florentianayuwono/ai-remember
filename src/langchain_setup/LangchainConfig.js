import { OpenAI } from "langchain/llms/openai";


import { getOpenAIAPIKey } from "../firebase_setup/FirebaseConfig.js";


const api_key = await getOpenAIAPIKey();

const openAIModel = new OpenAI({
    openAIApiKey: api_key,
    temperature: 0.9 //how creative it is allowed, 0 means none, 1 means full control
})

//pass prompt
//const modelres = await openAIModel.call("What's the best kiwi out there?");