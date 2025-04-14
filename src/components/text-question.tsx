import { Form } from "react-bootstrap";
import { BasicQuestion } from "../interfaces/question";
import { useState } from "react";
import "./css/question-tile.css";

interface TextQuestionProps {
    id: number,
    question:BasicQuestion
    passAnswer: (answer:string)=>void
}
export function TextQuestionTile({id, question, passAnswer}:TextQuestionProps){
    let [answer, setAnswer] = useState("");
    let changeAnswer=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setAnswer(e.target.value);
        passAnswer(e.target.value);
    }
    return (
        <div className="tile">
            <Form>
                <Form.Text className="text-color">
                    {(id+1).toString() + ". " + question.question}
                </Form.Text>
                <Form.Control type="textarea" onChange={changeAnswer}></Form.Control>
            </Form>
        </div>
    );
}