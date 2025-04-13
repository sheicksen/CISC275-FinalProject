import { Form, Button } from "react-bootstrap";
import { BasicQuestion } from "../interfaces/question";
import "./css/question-tile.css";

interface TextQuestionProps {
    id: number,
    question:BasicQuestion
}
export function TextQuestionTile({id, question}:TextQuestionProps){
    return (
        <div className="tile">
            <Form>
                <Form.Text>
                    {id.toString() + ". " + question.question}
                </Form.Text>
                <Form.Control type="textarea"></Form.Control>
                <Button>Submit</Button>
            </Form>
        </div>
    );
}