import { Button } from "react-bootstrap";
import { Question } from "../interfaces/question";
import { Page } from "../custom-types";
import { ResultsButton } from "./results-button";
import "./css/completion-alert.css";
import '../App.css'
import { Analysis } from "../interfaces/analysis";


interface CompletionAlertProps {
    setEnabled: (enable:boolean)=>void
    selectPage: (page:Page)=>void
    passAnalysis: (analysis: Promise<void | Analysis | undefined>)=>void
    questions: Question[]
       
}
export function CompletionAlert({setEnabled, selectPage, passAnalysis, questions}: CompletionAlertProps) {
    const reviewQuiz = ()=>{
        setEnabled(false);
    }
    return (
        <div id="completion-alert">
            <div id="completion-alert-card">
            <p>
                You've completed the quiz!
            </p>
            <ResultsButton passAnalysis={passAnalysis} questions={questions} enabled={true} selectPage={selectPage}></ResultsButton>
            <Button className="button-style review-quiz-btn" onClick={reviewQuiz}> Review Quiz </Button>
            </div>
        </div> 
    );
}
