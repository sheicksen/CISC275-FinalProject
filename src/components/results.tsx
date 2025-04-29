// import { Page } from '../custom-types';

import { generateResults } from "../gemini/ai-conversation-handler"
import { Question } from "../interfaces/question"
import { useState } from "react"
import { Career } from "../interfaces/career"
import "../components/css/results.css"


interface ResultsProps {
    setLoading: React.Dispatch<React.SetStateAction<string>>,
    questions: Question[]
}
export function Results({setLoading, questions}: ResultsProps): React.JSX.Element {
    let [results, setResults] = useState<Career[]>([]);

    function getResults(){
        setLoading("Loading Results");
        generateResults(questions).then(
            (value) => {
                if(value !== undefined){
                    setResults(value)
                    setLoading("")
                }      
            }
        ).catch((error)=>{
            setResults(error)
        });
    }
    // Checks if the user has submitted a quiz before requesting response from Gemini. Ensures the request only happens once.
    if (results.length === 0 && questions.length > 0){
        setResults([{jobTitle:"Working on it", jobDescription:"...", reasonForReccomendation:"...", avgSalary:"$0", educationLevel:"..."}])
        getResults();
    }
    let resultsBody = results.length > 1 ? results.map(
        (job)=>(
            <div>
                <h1 className="text-color">{job.jobTitle}</h1>
                <div className="wrapper">
                    <h1>Job Description</h1>
                    <p>{job.jobDescription}</p>
                    <h1>Reasoning</h1>
                    <p>{job.reasonForReccomendation}</p>
                    <h1>Average Salary</h1>
                    <p>{job.avgSalary}</p>
                    <h1>Minimum Education</h1>
                    <p>{job.educationLevel}</p>
                </div>
            </div>
    )) 
    : <p>Here, you'll see your results from previous quizzes</p>;
    return (
        <div className="results">
            {resultsBody}
        </div>
    )
}
