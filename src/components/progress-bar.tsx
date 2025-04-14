import { ProgressBar } from "react-bootstrap"
// import { useState } from "react";
interface ProgressBarProps {
    totalQuestions: number
    answeredQuestions: number
}
export function ProgBar({totalQuestions, answeredQuestions}:ProgressBarProps){
    // setPercent(Math.ceil((totalQuestions/answeredQuestions)*100))
    let percent=Math.ceil((answeredQuestions/totalQuestions)*100);
    return (
        <ProgressBar animated now={percent}></ProgressBar>
    );
}