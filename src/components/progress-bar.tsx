import { ProgressBar } from "react-bootstrap"
import "./css/progressbar.css";

interface ProgressBarProps {
    totalQuestions: number
    answeredQuestions: number
}
export function ProgBar({totalQuestions, answeredQuestions}: ProgressBarProps){
    const percent = Math.ceil(100 * answeredQuestions/totalQuestions);

    function mix(start: number, end: number): number {
        return Math.round(start + (end-start) * (answeredQuestions/totalQuestions));
    }

    const r = mix(128,48);
    const g = mix(0,177);
    const b = mix(128,184);
    const dynamicColor = `rgb(${r}, ${g}, ${b})`;
    //^ dynamic color changing progress bar ^

    return (
        <div id="progress-bar" className={percent >= 99 ? "sticky-bar complete-quiz" : "sticky-bar in-progress"}>
            <ProgressBar animated now={percent} label={percent >= 99 ? "Quiz Complete!":"Quiz Progress"}>
                <ProgressBar 
                    animated
                    now={percent} style={{backgroundColor: dynamicColor}}
                    label={percent >= 99 ? "Quiz Complete!":"Quiz Progress"}
                />
            </ProgressBar>
        </div> 
    );
}
