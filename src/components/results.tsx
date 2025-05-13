import React, { useState } from "react"
import "../components/css/results.css"
import { Analysis } from "../interfaces/analysis";
import { loggedIn } from "../functions/login";
import { Button, Form } from "react-bootstrap";


interface ResultsProps {
    setLoading: React.Dispatch<React.SetStateAction<string>>,
    promisedAnalysis: Promise<void | Analysis | undefined> | undefined
    setQuizRunName: (name: string) => Promise<void>
}
export function Results({setLoading, promisedAnalysis, setQuizRunName}: ResultsProps): React.JSX.Element {
    let [analysis, setAnalysis] = useState<Analysis | undefined>(undefined);
    const [resSetName, setResSetName] = useState<string>("");
    // console.log("updated results", analysis)

    if (!analysis && promisedAnalysis !== undefined) {
        setLoading("Loading Results");
        promisedAnalysis.then(
            (value) => {
                if(value !== undefined){
                    // console.log(value)
                    setAnalysis(value)
                    setLoading("")
                }      
            }
        ).catch((error)=>{
            console.log(error)
        });
    }
        
    // Checks if the user has submitted a quiz before requesting response from Gemini. Ensures the request only happens once.
    const resultsBody = analysis ? analysis.careers.map((job) => (
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

    function updateResSetName(event: React.ChangeEvent<HTMLInputElement>) {
        setResSetName(event.target.value);
    }
    function submitResSetName() {
        setQuizRunName(resSetName).then(() => setAnalysis(undefined));
    }
    const nameResponseSet = analysis && analysis.responseSet ? <p>This quiz run is called "{analysis.responseSet}".</p> : (
        <Form>
            <Form.Label>Quiz Run Name:</Form.Label>
            <Form.Control onChange={updateResSetName}></Form.Control>
            <Button className="button-style" onClick={submitResSetName}>Set Name</Button>
        </Form>
    );
    const nameThisAnalysis = analysis && analysis.name ? <p>This analysis is called "{analysis.name}"</p> : (
        <div>placeholder</div>
    );

    return (
        <div className="results">
            {resultsBody}
            {loggedIn() ? [nameResponseSet, nameThisAnalysis] : <div>placeholder</div>}
        </div>
    )
}
