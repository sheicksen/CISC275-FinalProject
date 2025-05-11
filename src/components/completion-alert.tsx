import { Button } from "react-bootstrap";
import { Question } from "../interfaces/question";
import { Career } from "../interfaces/career";
import { Page } from "../custom-types";
import { ResultsButton } from "./results-button";
import "./css/completion-alert.css";


interface CompletionAlertProps {
    selectPage: (page:Page)=>void
    passResults: (questions:Promise<void | Career[] | undefined>)=>void
    questions: Question[]
       
}
export function CompletionAlert({selectPage,passResults,questions}: CompletionAlertProps) {
    return (
        <div id="completion-alert">
            <div id="completion-alert-card">
            <p>
                You've completed the quiz!
            </p>
            <Button>Review Quiz</Button>
            <ResultsButton passResults={passResults} questions={questions} enabled={true} selectPage={selectPage}></ResultsButton>
            </div>
        </div> 
    );
}
