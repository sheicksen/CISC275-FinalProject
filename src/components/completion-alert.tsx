import { Button } from "react-bootstrap";
import { Page } from "../custom-types";
import { ResultsButton } from "./results-button";
import "./css/completion-alert.css";
import '../App.css'
import { Analysis } from "../interfaces/analysis";
import { QuizRun } from "../interfaces/user";


interface CompletionAlertProps {
    setEnabled: (enable:boolean)=>void
    selectPage: (page:Page)=>void
    passAnalysis: (analysis: Promise<void | Analysis | undefined>)=>void
    quizRun: QuizRun
    passQuizRun: (run: QuizRun) => void
}
export function CompletionAlert({setEnabled, selectPage, passAnalysis, quizRun, passQuizRun}: CompletionAlertProps) {
    const reviewQuiz = ()=>{
        setEnabled(false);
    }
    return (
        <div id="completion-alert">
            <div id="completion-alert-card">
                <p>You've completed the quiz!</p>
                <ResultsButton passAnalysis={passAnalysis} quizRun={quizRun} enabled={true} selectPage={selectPage} passQuizRun={passQuizRun}></ResultsButton>
                <Button className="button-style review-quiz-btn" onClick={reviewQuiz}> Review Quiz </Button>
            </div>
        </div> 
    );
}
