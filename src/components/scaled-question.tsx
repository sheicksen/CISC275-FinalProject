import { Form } from "react-bootstrap";
import { Question } from "../interfaces/question";
import "./css/question-tile.css";
import _ from "lodash";

const scaleBounds = {
    min: 1,
    max: 5
};
const scale = _.range(scaleBounds.min, scaleBounds.max + 1).map((val) => `${val}`);

interface ScaledQuestionProps {
    id: number,
    question: Question
    passAnswer: (question: Question, answer: string | number) => void
}
export function ScaledQuestionTile({id, question, passAnswer}:ScaledQuestionProps){
    function changeAnswer(e: React.ChangeEvent<HTMLInputElement>) {
        passAnswer(question, parseInt(e.target.value));
    }

    return (
        <div className="tile">
            <Form className="wrapper">
                <Form.Text className="text-color">{id+1}. {question.question}</Form.Text>

                <div>
                    {scale.map((num) => (
                        <Form.Check
                            inline
                            key={num}
                            type="radio"
                            onChange={changeAnswer}
                            label={num}
                            name={`group-${id.toString()}`}
                            value={num}
                        />
                    )
                    )}
                </div>
                
                <Form.Text className="underneath">{question.scale[0]}</Form.Text>
                <Form.Text className="underneath">{question.scale[1]}</Form.Text>
            </Form>
        </div>
    );
}
