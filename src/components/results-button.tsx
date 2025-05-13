import { Button } from "react-bootstrap";
import { Question } from "../interfaces/question";
import { Page } from '../custom-types';
import { generateResults } from "../gemini/ai-conversation-handler";
import '../App.css'
import { Analysis } from "../interfaces/analysis";
import { QuizRun } from "../interfaces/user";

interface ResultsButtonsProps {
    enabled: boolean,
    questions: Question[]
    selectPage: (page:Page)=>void
    passAnalysis: (analysis: Promise<void | Analysis | undefined>)=>void
    passQuizRun: (run: QuizRun) => void
}
export function ResultsButton({ enabled, questions, selectPage, passAnalysis, passQuizRun }: ResultsButtonsProps){
    const handleSubmit = () => {
        passAnalysis(generateResults(questions).then(
                    (value) => {
                        if(value !== undefined){
                            return {name: "", responseSet: "", careers: value};
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
        <Button className="button-style" disabled={!enabled} onClick={handleSubmit} style={{ display: 'block', margin: '20px auto'}}>{enabled ? "Get your results!" : "Complete the Quiz"}</Button>
    );
}