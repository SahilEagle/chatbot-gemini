import { Configuration } from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
export const configureOpenAI = () => {
    const config = new Configuration({
        apiKey: process.env.OPEN_AI_SECRET,
        organization: process.env.OPENAI_ORGANIZATION_ID,
    });
    return config;
};
const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 200,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
};
export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
export const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig });
//# sourceMappingURL=openai-config.js.map