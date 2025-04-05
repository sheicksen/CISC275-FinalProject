export type QuestionType = "text" | "scaled"

/**
 * @interface Question A generic question that could be of either type
 * @member {string} question The question to be asked
 * @member {QuestionType} type The type of question, either "text" or "scaled"
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
export interface TextQuestion extends Question<"text"> {
    // type: "text"
    answer: string | undefined
    scale: never
}

/**
 * @interface ScaledQuestion A question of type "scaled"
 * @member {string} question The question to be asked
 * @member {"scaled"} type The type of question, "scaled"
 * @member {number | undefined} answer The answer provided, if any
 * @member {[string, string]} scale The [lowEnd, highEnd] of the scale
 */
export interface ScaledQuestion extends Question<"scaled"> {
    // type: "scaled"
    answer: number | undefined
    scale: [string, string]
}
