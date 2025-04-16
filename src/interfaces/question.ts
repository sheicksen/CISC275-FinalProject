export type QuestionType = "text" | "scaled"

export interface Question{
    question:string,
    type:QuestionType,
    answer: string | number | undefined,
    scale: string[]
}
export function isScaled(question:Question):boolean{
    return question.type === "scaled";
}
export function isText(question:Question):boolean{
    return question.type === "text";
}