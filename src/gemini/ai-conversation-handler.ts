import { GoogleGenAI, Type } from "@google/genai";
import {Question} from "../interfaces/question"
import { Career } from "../interfaces/career";

const KEYNAME = "MYKEY";

/**
 * @function setAPIKey Sets the API key in localStorage.
 * @param {string} key The new value of the key
 */
export function setAPIKey(key: string) {
    localStorage.setItem(KEYNAME, JSON.stringify(key));
}

/**
 * @function getAPIKey Gets the API key from localStorage.
 * @returns {string} The API key, the empty string if not found
 */
export function getAPIKey(): string {
    return JSON.parse(localStorage.getItem(KEYNAME) ?? '""');
}

/**
 * @function getGoogleGenAI Gets the object for interfacing with Gemini.
 * @returns {GoogleGenAI} The object for interfacing with Gemini
 */
function getGoogleGenAI(): GoogleGenAI {
    return new GoogleGenAI({ apiKey: getAPIKey() });
}

/**
 * @function askQuestion Gets an answer from Gemini given a user-asked question.
 * @param {string}question The question asked by the user
 * @returns {string} The answer Gemini generated based on the given question
 */
export async function askQuestion(question: string){
    const ai = getGoogleGenAI();
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: question
    });
    return response.text;
}

export async function generateResults(data: Question[]){
    const ai = getGoogleGenAI();
    let quizAnswers:string = parseAnswers(data);
    const prompt:string = ("Could you recommend me 3 jobs I might like based on the following carrer quiz questions and answers:" + quizAnswers +
        "as a json with each job in the following format: " +
            "{ jobTitle: string, jobDescription: string, reasonForRecomendation : string, avgSalary: string, educationLevel : string}"
    );
    const response = await ai.models.generateContent({
        model:"gemini-2.0-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        jobTitle: {type: Type.STRING},
                        jobDescription: {type: Type.STRING},
                        reasonForRecommendation: {
                            type: Type.STRING, 
                            description:"based on my quiz answers, why did you recommend me this?"
                        },
                        avgSalary: {type: Type.STRING},
                        educationLevel: {type: Type.STRING}
                    },
                    propertyOrdering: ["jobTitle", "jobDescription", "reasonForRecommendation", "avgSalary","educationLevel"]
                }
            }
        }
    });
    console.log(response.text);
    return parseResults(response.text);
}

/**
 * @function generateQuestions takes a career field and returns a list of 7 Question objects based on that field.
 * @param {string} careerField the career field to base the questions off of.
 * @returns {Question<T>[]} an array of Question objects.
 *
 */
export async function generateQuestions(careerField: string){
    const ai = getGoogleGenAI();
    const prompt = `Could you generate 10 questions, 6 scaled and 4 text, dispersed randomly, that would help me find a career in ` + careerField + 
    ` using this object format for Likert scale questions:
        Question = {'question':string, 'type':"scaled", answer:undefined, scale:[string, string]}
    and this JSON scheme for text answered questions:
        Question = {'question':string, 'type':"text", answer:undefined, scale:[] }
        Return: Array<Question>
    `;
    const response = await ai.models.generateContent({
        model:"gemini-2.0-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        question: { type: Type.STRING },
                        type: {
                            type: Type.STRING,
                            pattern: "(scaled)|(text)",
                        },
                        // answer: { type: Type.TYPE_UNSPECIFIED, description: "always undefined" },
                        scale: {
                            type: Type.ARRAY,
                            description: "empty if text question, that is, if \"type\" is \"text\"",
                            items: {
                                type: Type.STRING
                            },
                            maxItems: "2"
                        }
                    },
                    propertyOrdering: ["question", "type", /* "answer", */ "scale"]
                }
            }
        }
    });
    console.log(response.text);
    let questions = parseQuestions(response.text);
    return questions;
    // return JSON.parse(response.text || "");
}

/**
 * @function parseQuestions takes a stringified array of json objects generated by Gemini and turns them into Questions
 * @param {string | undefined} questionsString a string in JSON format, from Gemini
 * @returns {Question[]} an array of Questions.
 */
function parseQuestions(questionsString: string | undefined): Question[] {
    let questions: Question[] = [];
    if (questionsString === undefined) return questions;
    const thingToParse = questionsString;
    try{
        const object: Question[] = JSON.parse(thingToParse);
        console.log(object);
        questions = [...object];
    } catch (error){
        console.log("Could not parse JSON ", error, thingToParse);
    }
    return questions;
}

function parseAnswers(questions:Question[]): string{
    let answers: string = ""
    for (let i =0; i < questions.length; i++){
        answers += "Question: " + questions[i].question;
        if (questions[i].type === "scaled"){
            answers += "I answered " + questions[i].answer?.toString + " on a scale of 5, where 1 is " + questions[i].scale[0] + " to 5 which is " + questions[i].scale[1] + " and 3 expressed indifference";
        } else {
            answers += "I answered " + questions[i].answer;
        }
    }
    return answers;
}

function parseResults(resultString:string | undefined):Career[]{
    let careers:Career[]=[];
    if (resultString !== undefined){
        try{
  
            let object:Career[] = JSON.parse(resultString);
            console.log(object);
            careers = [...object];
        } catch (error){
                    console.log("Could not parse results JSON ", error, resultString);
        }
    }
    return careers;
}