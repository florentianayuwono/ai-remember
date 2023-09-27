import { OpenAI } from "openai";

import {
  addDataForDay,
  getAllMsg,
  getOpenAIAPIKey,
  addMsg,
} from "../firebase_setup/FirebaseConfig.js";

const diary_api_key = await getOpenAIAPIKey("openai_api_key");

const diaryModel = new OpenAI({
  apiKey: diary_api_key,
  dangerouslyAllowBrowser: true,
});

export const diaryGenerator = async (chats) => {
  const diary_prompt =
    "Imagine yourself as the user who writes these texts about his/her daily life. Write a diary about this and keep the personality and tone of the user, as if the user itself who write the diary." +
    chats;
  const response = await diaryModel.completions.create({
    model: "text-davinci-003",
    prompt: diary_prompt,
    temperature: 0.5,
    max_tokens: 1024,
    n: 1,
    stop: "",
  });
  const result = response.choices[0].text.trim();
  return result;
};
