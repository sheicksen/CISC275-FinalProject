import { Button } from "react-bootstrap";
interface ResultsButtonsProps {
    enabled: boolean;
}
export function ResultsButton({ enabled }: ResultsButtonsProps){
    return (
        <Button disabled={!enabled}>{enabled ? "Get your results!" : "Complete the Quiz"}</Button>
    );
}