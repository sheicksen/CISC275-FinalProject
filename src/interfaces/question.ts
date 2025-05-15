import _ from "lodash";

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

export const scaleBounds = {
    min: 1,
    max: 5
};
export const scale = _.range(scaleBounds.min, scaleBounds.max + 1).map((val) => `${val}`);
