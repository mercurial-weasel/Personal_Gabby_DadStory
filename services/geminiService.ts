import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Memory } from "@/types";

// Always initialize with the environment variable
const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRandomMemory = async (): Promise<Memory> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "Tell me a heartfelt, short fictional 'Dad memory' for a daughter named Gabby. It should feel nostalgic, personal, and end with a piece of wisdom. Make it about 3 paragraphs.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          story: { type: Type.STRING },
          theme: { type: Type.STRING }
        },
        required: ["title", "story", "theme"]
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}') as Memory;
  } catch (error) {
    console.error("Failed to parse memory response", error);
    throw error;
  }
};

export const chatWithDad = async (history: any[], message: string): Promise<string> => {
  const ai = getAIClient();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are Gabby's father, sharing stories and wisdom. Your tone is warm, encouraging, nostalgic, and loving. You speak directly to Gabby. If she asks for a story, make one up that fits the persona of a loving, wise father who has lived a full life.",
    }
  });

  // Although we have history, we'll just send the current message for simplicity in this demo
  // Or we could pass the full history array if needed.
  const result = await chat.sendMessage({ message });
  return result.text || "I'm lost for words right now, but I love you.";
};