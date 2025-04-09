import { GoogleGenAI } from "@google/genai";

/**
 * @function askQuestion Gets an answer from Gemini given a user-asked question.
 * @param {string} apiKey The api key used for the request 
 * @param {string}question The question asked by the user
 * @returns {string} The answer Gemini generated based on the given question
 */
export async function askQuestion(apiKey: string, question: string){
    const ai = new GoogleGenAI({ apiKey: apiKey});
    const reponse = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: question
    });
    return reponse;
}

export async function generateResults(apiKey: string, data: string){
    const ai = new GoogleGenAI({ apiKey: apiKey});
    const response = await ai.models.generateContent({
        model:"gemini-2.0-flash",
        contents: "Could you recommend me a career based on the following questions and answers?"
    })
    return response;
}