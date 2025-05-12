import { Button } from "react-bootstrap";
import { Question } from "../interfaces/question";
import { Career } from "../interfaces/career";
import { Page } from "../custom-types";
import { ResultsButton } from "./results-button";
import "./css/completion-alert.css";
import '../App.css'


interface CompletionAlertProps {
    setEnabled: (enable:boolean)=>void
    selectPage: (page:Page)=>void
    passResults: (questions:Promise<void | Career[] | undefined>)=>void
    questions: Question[]
       
}
export function CompletionAlert({setEnabled, selectPage,passResults,questions}: CompletionAlertProps) {
    const reviewQuiz = ()=>{
        setEnabled(false);
    }
    return (
        <div id="completion-alert">
            <div id="completion-alert-card">
            <p>
                You've completed the quiz!
            </p>
            <ResultsButton passResults={passResults} questions={questions} enabled={true} selectPage={selectPage}></ResultsButton>
            <Button className="button-style review-quiz-btn" onClick={reviewQuiz}> Review Quiz </Button>
            </div>
        </div> 
    );
}
