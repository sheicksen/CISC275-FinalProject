import React, { useState } from "react"
import "./css/results.css"
import { Analysis } from "../interfaces/analysis";
import { loggedIn } from "../functions/login";
import { Button, Form } from "react-bootstrap";
import { Login } from "./login";
import { Page } from "../custom-types";


interface ResultsProps {
    setLoading: React.Dispatch<React.SetStateAction<string>>,
    promisedAnalysis: Promise<void | Analysis | undefined> | undefined
    setQuizRunName: (name: string) => Promise<void>
    setAppAnalysisName: (name: string) => Promise<void>
    refreshApp: () => void
    runIsSaved: boolean
    selectPage: (page: Page)=> void
}
export function Results({setLoading, promisedAnalysis, setQuizRunName, setAppAnalysisName, refreshApp, runIsSaved, selectPage}: ResultsProps): React.JSX.Element {
    let [analysis, setAnalysis] = useState<Analysis | undefined>(undefined);
    const [resSetName, setResSetName] = useState<string>("");
    const [analysisName, setAnalysisName] = useState<string>("");
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

    function updateResSetName(event: React.ChangeEvent<HTMLInputElement>) {
        setResSetName(event.target.value);
    }
    function submitResSetName() {
        setQuizRunName(resSetName).then(() => setAnalysis(undefined));
    }
    const nameResponseSet = analysis && analysis.responseSet ? <p>This quiz run is called "{analysis.responseSet}"{runIsSaved ? "" : " (unsaved)"}.</p> : (
        <Form onSubmit={submitResSetName}>
            <Form.Label>Quiz Run Name:</Form.Label>
            <Form.Control onChange={updateResSetName}></Form.Control>
            <Button className="button-style" onClick={submitResSetName}>Set Name</Button>
        </Form>
    );

    function updateAnalysisName(event: React.ChangeEvent<HTMLInputElement>) {
        setAnalysisName(event.target.value);
    }
    function submitAnalysisName() {
        setAppAnalysisName(analysisName).then(() => setAnalysis(undefined));
    }
    const nameThisAnalysis = analysis && analysis.responseSet ? analysis.name ? <p>This analysis is called "{analysis.name}".</p> : (
        <Form onSubmit={submitAnalysisName}>
            <Form.Label>Analysis Name:</Form.Label>
            <Form.Control onChange={updateAnalysisName}></Form.Control>
            <Button className="button-style" onClick={submitAnalysisName}>Set Name and Save</Button>
        </Form>
    ) : <p>Name the quiz run before naming the analysis to save.</p>;

    const goToAnalysesMenu = runIsSaved ? <Button className="button-style" onClick={() => {selectPage("Analyses Menu")}}>Go To Analyses Menu</Button> : "";

    return (
        <div className="results">
            {resultsBody}
            {loggedIn() ? (
                <div id="save-menu">
                    {nameResponseSet}
                    {nameThisAnalysis}
                    {goToAnalysesMenu}
                </div>
            ) : (
                <div>
                    <h2 className="login-header">Login or Sign Up to save your quiz&nbsp;and&nbsp;results.</h2>
                    <Login selectPage={() => {refreshApp()}}></Login>
                </div>
            )}
        </div>
    )
}
