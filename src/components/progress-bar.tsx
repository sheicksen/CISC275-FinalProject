import { ProgressBar } from "react-bootstrap"
import "./css/progressbar.css";

interface ProgressBarProps {
    totalQuestions: number
    answeredQuestions: number
}
export function ProgBar({totalQuestions, answeredQuestions}:ProgressBarProps){
    let percent=Math.ceil((answeredQuestions/totalQuestions)*100);
    return (
        <div className="sticky-bar">
            <ProgressBar animated now={percent} label="Quiz Progress"></ProgressBar>
        </div> 
    );
}