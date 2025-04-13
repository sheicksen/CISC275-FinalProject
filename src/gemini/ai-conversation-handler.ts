import { GoogleGenAI } from "@google/genai";
import {Question} from "../interfaces/question"

/**
 * @function askQuestion Gets an answer from Gemini given a user-asked question.
 * @param {string} apiKey The api key used for the request 
 * @param {string}question The question asked by the user
 * @returns {string} The answer Gemini generated based on the given question
 */
export async function askQuestion(apiKey: string, question: string){
    const ai = new GoogleGenAI({ apiKey: apiKey});
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: question
    });
    return response.text;
}

export async function generateResults(apiKey: string, data: string){
    const ai = new GoogleGenAI({ apiKey: apiKey});
    const response = await ai.models.generateContent({
        model:"gemini-2.0-flash",
        contents: "Could you recommend me a career based on the following questions and answers?"
    })
    return response.text;
}

export async function generateQuestions(apiKey: string, careerField:string){
    const ai = new GoogleGenAI({ apiKey: apiKey});
    const prompt = `Could you generate 7 questions that would help me find a career in ` + careerField + 
    ` using this object format for Likert scale questions:
        Question = {'question':string, 'type':"scaled", answer:undefined, scale:[string, string]}
    and this JSON scheme for text answered questions:
        Question = {'question':string, 'type':"text", answer:undefined }
        Return: Array<Question>
    `;
    const response = await ai.models.generateContent({
        model:"gemini-2.0-flash",
        contents: prompt
    });
    console.log(response.text);
    let questions = parseQuestions(response.text);
    return questions;
}

function parseQuestions(questionsString: string | undefined){
    //string format: ```json[{...},{...}]```
    let questions:Question<"scaled" | "text">[] = [];
    if (questionsString !== undefined){
        try{
            let object:Question<"scaled" | "text">[] = JSON.parse(questionsString.substring(8,questionsString.length-4), (key, value)=>{
                return value;
            });
            console.log(object);
            questions = object;
        } catch (error){
                    console.log("Could not parse JSON ", error);
        }
    }
    return questions;
}