import { Button } from "react-bootstrap";
import { Question } from "../interfaces/question";
import { Page } from '../custom-types';
import '../App.css'

interface ResultsButtonsProps {
    enabled: boolean,
    questions: Question[]
    selectPage: (page:Page)=>void
    passQuestions: (questions:Question[])=>void
}
export function ResultsButton({ enabled, questions, selectPage, passQuestions }: ResultsButtonsProps){
    const handleSubmit = () => {
        passQuestions(questions)
        selectPage("Results");
    }
    return (
        <Button className="button-style" disabled={!enabled} onClick={handleSubmit} style={{ display: 'block', margin: '20px auto' }}>{enabled ? "Get your results!" : "Complete the Quiz"}</Button>
    );
}