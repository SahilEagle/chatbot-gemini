import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // first we require message from the user
  const { message } = req.body;

  const user = await User.findById(res.locals.jwtData.id);
  if (!user) {
    return res
      .status(401)
      .json({ message: "User not registered OR Token malfunctioned" });
  }

  const chats = user.chats.map(({ content }) => ({
    content,
  })) as any[];
  chats.push({ content: message, role: "user" });
  user.chats.push({ content: message, role: "user" });

  try {
    async function runChat() {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];

      const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
      });

      const result = await chat.sendMessage(message);
      const response = result.response;

      user.chats.push({content: response.text(), role:"bot"});
      await user.save();
    }


    runChat();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
