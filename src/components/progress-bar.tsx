import { ProgressBar } from "react-bootstrap"
import "./css/progressbar.css";

interface ProgressBarProps {
    totalQuestions: number
    answeredQuestions: number
}
export function ProgBar({totalQuestions, answeredQuestions}:ProgressBarProps){
    let percent=Math.ceil((answeredQuestions/totalQuestions)*100);

    let mix = (start: number, end: number) => Math.round(start + (end-start) * (answeredQuestions/totalQuestions));
    let r = mix(128,48);
    let g = mix(0,177);
    let b = mix(128,184);
    let dynamicColor = `rgb(${r}, ${g}, ${b})`;
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