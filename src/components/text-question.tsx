import { Form } from "react-bootstrap";
import { Question } from "../interfaces/question";
import "./css/question-tile.css";
import "./css/login.css"
import { useState } from "react";

interface TextQuestionProps {
    id: number,
    question:Question
    passAnswer: (id:number, question:Question, answer:string)=>void
}
/**
 * @function validateText checks that a string is not all white space and/or punctuation and contains more than a few characters.
 * @param text that the user entered.
 * @returns a boolean value representing whether the string is valid or not.
 */
function validateText(text:string):boolean{
    let valid = true;
    let strippedText = text.replace(/\s/g, "")
    if(strippedText.length < 3){
        valid = false;
    }
    return valid;
}
export function TextQuestionTile({id, question, passAnswer}:TextQuestionProps){
    let [valid, setValid] = useState<boolean>(true);
    const changeAnswer=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if (validateText(e.target.value)){
            setValid(true);
            passAnswer(id, question, e.target.value);
        } else {
            setValid(false);
        }
    }
    return (
        <div className="tile">
            <Form className="wrapper">
                <Form.Text className="text-color">
                    {(id+1).toString() + ". " + question.question}
                </Form.Text>
                <Form.Control required type="textarea" onChange={changeAnswer}></Form.Control>
            </Form>
            {!valid &&
                <div id="login-failure" className="align-to-button">
                    {`For the best experience, ensure your response is valid.`}
                </div>
            }
        </div>
    );
}