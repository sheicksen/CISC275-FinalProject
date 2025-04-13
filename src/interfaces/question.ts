export type QuestionType = "text" | "scaled"

/**
 * @interface Question A generic question that could be of either type
 * @param {extends QuestionType} T The type of the question
 * @member {string} question The question to be asked
 * @member {T} type The type of question, either "text" or "scaled"
 * @member {(T extends "text" ? string : number) | undefined} answer The answer provided, if any
 * @member {T extends "scaled" ? [string, string] : never} scale The [lowEnd, highEnd] of the scale, if any
 */
export interface Question<T extends QuestionType> {
    question: string
    type: T
    answer: (T extends "text" ? string : number) | undefined
    scale: T extends "scaled" ? [string, string] : never
}

/**
 * @interface TextQuestion A question of type "text"
 * @member {string} question The question to be asked
 * @member {"text"} type The type of question, "text"
 * @member {string | undefined} answer The answer provided, if any
 */
export interface TextQuestion extends Omit<Question<"text">, "scale"> {
    answer: string | undefined
}

/**
 * @interface ScaledQuestion A question of type "scaled"
 * @member {string} question The question to be asked
 * @member {"scaled"} type The type of question, "scaled"
 * @member {number | undefined} answer The answer provided, if any
 * @member {[string, string]} scale The [lowEnd, highEnd] of the scale
 */
export interface ScaledQuestion extends Question<"scaled"> {
    answer: number | undefined
    scale: [string, string]
}

/**
 * @interface AnsweredQuestion A generic question that is gauranteed to have an answer
 * @param {extends QuestionType} T The type of the question
 * @member {string} question The question to be asked
 * @member {T} type The type of question, either "text" or "scaled"
 * @member {T extends "text" ? string : number} answer The answer provided
 * @member {T extends "scaled" ? [string, string] : never} scale The [lowEnd, highEnd] of the scale, if any
 */
export interface AnsweredQuestion<T extends QuestionType> extends Question<T> {
    answer: T extends "text" ? string : number
}

export type BasicQuestion = ScaledQuestion | TextQuestion;