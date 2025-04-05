import { AnsweredQuestion } from "./question";

export type QuizType = "basic" | "detailed";

/**
 * @interface Responses All of the info knowable about a set of responses
 * @member {string} name The name of the quiz-taking instance
 * @member {QuizType} type The type of quiz, either "basic" or "detailed"
 * @member {AnsweredQuestion[]} questions The list of questions, gauranteed to have responses
 */
export interface Responses {
    name: string
    type: QuizType
    questions: AnsweredQuestion[]
}
