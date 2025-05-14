import { Button } from "react-bootstrap";
import { Page } from '../custom-types';
import { generateResults } from "../gemini/ai-conversation-handler";
import '../App.css'
import { Analysis } from "../interfaces/analysis";
import { QuizRun } from "../interfaces/user";

interface ResultsButtonsProps {
    enabled: boolean,
    quizRun: QuizRun
    selectPage: (page:Page)=>void
    passAnalysis: (analysis: Promise<void | Analysis | undefined>)=>void
    passQuizRun: (run: QuizRun) => void
    children?: string | undefined
    className?: string | undefined
}
export function ResultsButton({ enabled, quizRun, selectPage, passAnalysis, passQuizRun, children, className }: ResultsButtonsProps) {
    const handleSubmit = () => {
        passQuizRun({...quizRun});
        passAnalysis(generateResults(quizRun.responses.questions).then(
                    (value) => {
                        if(value !== undefined){
                            return {name: "", responseSet: quizRun.responses.name, careers: value};
                        }else {
                            handleSubmit();
                        }
                    }
                ).catch((error)=>{
                    console.log(error)
                }));
        selectPage("Results");
    }
    return (
        <Button className={`button-style ${className}`} disabled={!enabled} onClick={handleSubmit} style={{ display: 'block', margin: '20px auto'}}>{children ?? (enabled ? "Get your results!" : "Complete the Quiz")}</Button>
    );
}
