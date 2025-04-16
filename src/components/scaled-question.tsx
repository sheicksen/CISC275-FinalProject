import { Form } from "react-bootstrap";
import { Question } from "../interfaces/question";
import "./css/question-tile.css";


interface ScaledQuestionProps {
    id:number,
    question:Question
    passAnswer:(id:number, question:Question, answer:string | number)=>void
}
export function ScaledQuestionTile({id, question, passAnswer}:ScaledQuestionProps){
    let scale = ["1", "2", "3", "4", "5"]
    let changeAnswer = (e:React.ChangeEvent<HTMLInputElement>) => {
        passAnswer(id, question, parseInt(e.target.value));
    }
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
                        key={num}
                        type="radio"
                        onChange={changeAnswer}
                        label={num === "1" ? question.scale[0] : num === "5" ? question.scale[1] : num}
                        name={"group-" + id.toString()}
                        id={num}
                        value={num}
                        ></Form.Check>
                    )
                    )}
                </div>
            </Form>
        </div>
    );
}