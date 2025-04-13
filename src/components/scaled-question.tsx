import { Form, Button } from "react-bootstrap";
import { Question } from "../interfaces/question";
import "./css/question-tile.css";
interface ScaledQuestionProps {
    id:number,
    question:Question<"scaled">
}
export function ScaledQuestionTile({id, question}:ScaledQuestionProps){
    let scale = ["1", "2", "3", "4", "5"]
    return (
        <div className="tile">
            <Form>
                <Form.Text className="text-color">
                    {(id+1).toString() + ". " + question.question}
                </Form.Text>
                <div>
                    {scale.map((num:string)=>(
                        <Form.Check
                        inline
                        type="radio"
                        label={num === "1" ? question.scale[0] : num === "5" ? question.scale[1] : num}
                        name={"group-" + id.toString()}
                        id={num}
                        ></Form.Check>
                    )
                    )}
                </div>
                <Button className="button-color">Submit</Button>
            </Form>
        </div>
    );
}