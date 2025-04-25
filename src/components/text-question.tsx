import { Form } from "react-bootstrap";
import { Question } from "../interfaces/question";
import "./css/question-tile.css";

interface TextQuestionProps {
    id: number,
    question:Question
    passAnswer: (id:number, question:Question, answer:string)=>void
}
export function TextQuestionTile({id, question, passAnswer}:TextQuestionProps){
    let changeAnswer=(e:React.ChangeEvent<HTMLInputElement>)=>{
        passAnswer(id, question, e.target.value);
    }
    return (
        <div className="tile">
            <Form className="wrapper">
                <Form.Text className="text-color">
                    {(id+1).toString() + ". " + question.question}
                </Form.Text>
                <Form.Control type="textarea" onChange={changeAnswer}></Form.Control>
            </Form>
        </div>
    );
}