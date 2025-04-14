import { ProgressBar } from "react-bootstrap"
import { useState } from "react";
interface ProgressBarProps {
    totalQuestions: number
    answeredQuestions: number
}
export function ProgBar({totalQuestions, answeredQuestions}:ProgressBarProps){
    let [percent, setPercent] = useState(0);
    setPercent(Math.ceil((totalQuestions/answeredQuestions)*100))
    return (
        <ProgressBar now={percent} label={`${percent}%`}></ProgressBar>
    );
}