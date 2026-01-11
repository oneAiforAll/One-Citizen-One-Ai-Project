
import { GoogleGenAI, Type } from "@google/genai";
import { CitizenProfile, AIProjectIdea } from "./types";

export const generateProjectIdeas = async (profile: CitizenProfile, lang: 'en' | 'fr'): Promise<AIProjectIdea[]> => {
  // Always initialize with the latest API key from the environment
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const langInstruction = lang === 'fr' 
    ? "Please provide the response in French." 
    : "Please provide the response in English.";

  const prompt = `
    Citizen Profile for Clair, New Brunswick (A small rural village):
    - Name: ${profile.name}
    - Role: ${profile.role}
    - Passions: ${profile.passions}
    - Challenges: ${profile.challenges}
    - Weekly Commitment: ${profile.timeCommitment}

    The village mission is "One Citizen = One AI Project". 
    Suggest 3 unique, actionable project ideas that leverage AI (like LLMs, vision, or automation).
    One must be Creative, one Economic (income-generating), and one Community-focused.
    
    ${langInstruction}
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            type: { type: Type.STRING },
            description: { type: Type.STRING },
            potentialImpact: { type: Type.STRING },
            revenueModel: { type: Type.STRING }
          },
          required: ["title", "type", "description", "potentialImpact"]
        }
      }
    }
  });

  try {
    // response.text is a property, not a method
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return [];
  }
};
