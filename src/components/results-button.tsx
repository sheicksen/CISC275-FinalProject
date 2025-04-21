import { Button } from "react-bootstrap";
import { Question } from "../interfaces/question";
interface ResultsButtonsProps {
    enabled: boolean,
    questions: Question[]
}
export function ResultsButton({ enabled, questions }: ResultsButtonsProps){
    const handleSubmit = () => {
        console.log(questions);
    }
    return (
        <Button disabled={!enabled} onClick={handleSubmit}>{enabled ? "Get your results!" : "Complete the Quiz"}</Button>
    );
}