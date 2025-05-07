import { Button } from "react-bootstrap";
import { Question } from "../interfaces/question";
import { Page } from '../custom-types';
import { generateResults } from "../gemini/ai-conversation-handler";
import { Career } from "../interfaces/career";
import '../App.css'

interface ResultsButtonsProps {
    enabled: boolean,
    questions: Question[]
    selectPage: (page:Page)=>void
    passResults: (questions:Promise<void | Career[] | undefined>)=>void
}
export function ResultsButton({ enabled, questions, selectPage, passResults }: ResultsButtonsProps){
    const handleSubmit = () => {
        passResults(generateResults(questions).then(
                    (value) => {
                        if(value !== undefined){
                            return value;
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
        <Button className="button-style" disabled={!enabled} onClick={handleSubmit} style={{ display: 'block', margin: '20px auto' }}>{enabled ? "Get your results!" : "Complete the Quiz"}</Button>
    );
}