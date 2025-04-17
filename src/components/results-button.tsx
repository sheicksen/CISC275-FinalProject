import { Button } from "react-bootstrap";
import { Question } from "../interfaces/question";
interface ResultsButtonsProps {
    enabled: boolean,
    questions: Question[]
}
export function ResultsButton({ enabled, questions }: ResultsButtonsProps){
    return (
        <Button disabled={!enabled}>{enabled ? "Get your results!" : "Complete the Quiz"}</Button>
    );
}