import { Form } from "react-bootstrap";
import { Question } from "../interfaces/question";
import "./css/question-tile.css";
import { useState } from "react";
import { validateText } from "../functions/validation";
import { preventFormSubmitReload } from "../functions/form-submit";

interface TextQuestionProps {
    id: number,
    question: Question
    passAnswer: (question: Question, answer: string) => void
}

export function TextQuestionTile({id, question, passAnswer}: TextQuestionProps){
    const [valid, setValid] = useState<boolean>(true);
    const [focused, setFocused] = useState<boolean>(true);

    function changeAnswer(e: React.ChangeEvent<HTMLInputElement>) {
        setValid(validateText(e.target.value));
        passAnswer(question, e.target.value);
    }

    function handleFocus() {
        setFocused(true);
    }
    function handleBlur() {
        setFocused(false);
    }

    return (
        <div className="tile">
            <Form className="wrapper" onSubmit={preventFormSubmitReload}>
                <Form.Text className="text-color">
                    {(id+1).toString() + ". " + question.question}
                </Form.Text>
                <Form.Control required type="textarea" onChange={changeAnswer} onFocus={handleFocus} onBlur={handleBlur}></Form.Control>
            </Form>
            {!valid && !focused && <div className="align-to-button invalid">For the best experience, ensure your response is valid.</div>}
        </div>
    );
}
