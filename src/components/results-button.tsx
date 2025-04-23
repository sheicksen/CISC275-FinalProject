import { Button } from "react-bootstrap";
import { Question } from "../interfaces/question";
import { Page } from '../custom-types';
interface ResultsButtonsProps {
    enabled: boolean,
    questions: Question[]
    selectPage: (page:Page)=>void
}
export function ResultsButton({ enabled, questions, selectPage }: ResultsButtonsProps){
    const handleSubmit = () => {
        console.log(questions);
    }
    return (
        <Button disabled={!enabled} onClick={handleSubmit}>{enabled ? "Get your results!" : "Complete the Quiz"}</Button>
    );
}