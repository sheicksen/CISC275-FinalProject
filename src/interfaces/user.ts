import { Analysis } from "./analysis"
import { Responses } from "./responses"

/**
 * @interface QuizRun A pairing of responses with the analyses run on them
 * @member {Responses} responses The response set
 * @member {Analysis[]} analyses The analyses that have been run on the responses
 */
export interface QuizRun {
    responses: Responses
    analyses: Analysis[]
}

/**
 * @interface User A user
 * @member {string} name The name of the user
 * @member {QuizRun[]} quizzes The independent times that this user has completed the quiz
 */
export interface User {
    name: string
    quizzes: QuizRun[]
}
