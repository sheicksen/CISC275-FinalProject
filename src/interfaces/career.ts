/**
 * @interface Career The analysis of a specific set of responses
 * @member {string} jobTitle The namme of the job
 * @member {string} jobDescription The description for the given job
 * @member {string} reasonForReccomendation Why the AI reccomends this career
 * @member {number} avgSalary the average salary for said job
 * @member {string} educationLevel the level of education needed for said job
 */
export interface Career{
    jobTitle: string
    jobDescription: string
    reasonForReccomendation : string
    avgSalary: number
    educationLevel : string
}