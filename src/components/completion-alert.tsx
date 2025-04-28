// import { ProgressBar } from "react-bootstrap"
// import "./css/progressbar.css";

interface CompletionAlertProps {
    totalQuestions: number
    answeredQuestions: number
}
export function CompletionAlert({totalQuestions, answeredQuestions}: CompletionAlertProps) {
    const done = answeredQuestions >= totalQuestions;
    return (
        <div id="completion-alert" style={{visibility: done ? "visible" : "collapse"}}>
            You've completed all of the questions.  Click below for results!
        </div> 
    );
}
