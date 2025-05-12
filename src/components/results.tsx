import { useState } from "react"
import "../components/css/results.css"
import { Analysis } from "../interfaces/analysis";


interface ResultsProps {
    setLoading: React.Dispatch<React.SetStateAction<string>>,
    promisedAnalysis: Promise<void | Analysis | undefined> | undefined
}
export function Results({setLoading, promisedAnalysis}: ResultsProps): React.JSX.Element {
    let [analysis, setResults] = useState<Analysis>({name: "", responseSet: "", careers: []});
        if (analysis.careers.length === 0 && promisedAnalysis !== undefined){
            setLoading("Loading Results");
            promisedAnalysis.then(
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
        
    // Checks if the user has submitted a quiz before requesting response from Gemini. Ensures the request only happens once.
    let resultsBody = analysis.careers.length > 1 ? analysis.careers.map((job) => (
        <div>
            <h1 className="text-color">{job.jobTitle}</h1>
            <div className="wrapper">
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
