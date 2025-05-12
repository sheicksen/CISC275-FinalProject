import { Career } from "./career"

/**
 * I don't know what else to include here.  Feel free to add as necessary.
 * @interface Analysis The analysis of a specific set of responses
 * @member {string} name The name of the analysis
 * @member {string} responseSet The name of the responses (see Responses.name)
 * @member {Career[]} careers The careers generated for this analysis
 */
export interface Analysis {
    name: string
    responseSet: string
    careers: Career[]
}
