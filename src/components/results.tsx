import { useState } from "react"
import { Career } from "../interfaces/career"
import "../components/css/results.css"


interface ResultsProps {
    setLoading: React.Dispatch<React.SetStateAction<string>>,
    promisedResults: Promise<void | Career[] | undefined> | undefined
}
export function Results({setLoading, promisedResults}: ResultsProps): React.JSX.Element {
    let [results, setResults] = useState<Career[]>([]);
        if (results.length === 0 && promisedResults !== undefined){
            setLoading("Loading Results");
            promisedResults.then(
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
        
    let resultsBody = results.length > 1 ? results.map(
        (job)=>(
            <div>
                <h1 className="text-color">{job.jobTitle}</h1>
                <div className="rep-wrapper">
                    <h1>Job Description</h1>
                    <p>{job.jobDescription}</p>
                    <h1>Reasoning</h1>
                    <p>{job.reasonForRecommendation}</p>
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
