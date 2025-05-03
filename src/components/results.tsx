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
    let [waiting, setWaiting] = useState<boolean>(false);

    function getResults(){
        if(waiting){
            setLoading("Loading Results");
            generateResults(questions).then(
                (value) => {
                    if(value !== undefined){
                        setResults(value)
                        setLoading("")
                    }      
                }
            ).catch((error)=>{
                console.log(error)
            });
        }
    }
    // Checks if the user has submitted a quiz before requesting response from Gemini. Ensures the request only happens once.
    if (!waiting && questions.length > 0){
        setWaiting(true);
        console.log("Calling get results");
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
