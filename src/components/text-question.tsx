import { Form } from "react-bootstrap";
import { Question } from "../interfaces/question";
import "./css/question-tile.css";
import { useState } from "react";
import { validateText } from "../functions/validation";
import { preventFormSubmitReload } from "../functions/form-submit";

interface TextQuestionProps {
    id: number,
    question:Question
    passAnswer: (id:number, question:Question, answer:string)=>void
}

export function TextQuestionTile({id, question, passAnswer}:TextQuestionProps){
    let [valid, setValid] = useState<boolean>(true);
    let [focused, setFocused] = useState<boolean>(true);
    const changeAnswer=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if (validateText(e.target.value)){
            setValid(true);
        } else {
            setValid(false);
        }
        passAnswer(id, question, e.target.value);
    }
    const handleFocus = () => {
        setFocused(true)
    }
    const handleBlur = () => {
        setFocused(false)
    };
    return (
        <div className="tile">
            <Form className="wrapper" onSubmit={preventFormSubmitReload}>
                <Form.Text className="text-color">
                    {(id+1).toString() + ". " + question.question}
                </Form.Text>
                <Form.Control required type="textarea" onChange={changeAnswer} onFocus={handleFocus} onBlur={handleBlur}></Form.Control>
            </Form>
            {(!valid && !focused) &&
                <div className="align-to-button invalid">
                    {`For the best experience, ensure your response is valid.`}
                </div>
            }
        </div>
    );
}