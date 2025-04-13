import { Form, Button } from "react-bootstrap";
import { BasicQuestion } from "../interfaces/question";
interface TextQuestionProps {
    id: number,
    question:BasicQuestion
}
export function TextQuestionTile({id, question}:TextQuestionProps){
    return (
        <div>
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