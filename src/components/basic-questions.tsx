import { Question, QuestionType} from "../interfaces/question";
import QuestionData from "../resources/basic-questions.json";
import { useState } from "react";
import { ScaledQuestionTile } from "./scaled-question";
import { ResultsButton } from "./results-button";

interface GenericQuestion {
    question: string,
    type: QuestionType,
    scale:string[],
}
const genericQuestions = QuestionData as GenericQuestion[][];

function parseQuestions(questions:GenericQuestion[]):Question[]{
    let parsedQuestions: Question[] = [];

    for (let i = 0; i < questions.length; i++){
       parsedQuestions.push({...questions[i], answer: undefined});
    }
    return parsedQuestions;
}

let questions: Question[] = parseQuestions(genericQuestions[0]);
export function BasicQuestions(): React.JSX.Element {
    let [answeredQs, setAnsweredQs] = useState<Question[]>([]);
    let [finished, setFinished] = useState<boolean>(false);
    let updateAnswers = (id:number, q:Question, answer:string | number) =>{
        let search:Question[] = answeredQs.filter((question)=>question.question===q.question);
        if(search.length > 0){
            let editedAnswers:Question[] = [...answeredQs.filter((question)=>question.question !== q.question), {...search[0], answer:answer}]
            setAnsweredQs(editedAnswers);
        } else {
            let addedAnswer = [...answeredQs, {...q, answer:answer}];
            setAnsweredQs(addedAnswer);
        }
        if(answeredQs.length === questions.length){
            setFinished(true);
        }
    }
    let quizBody = questions.map((question, index)=>(
        <ScaledQuestionTile id = {index} question={{...question}} passAnswer={updateAnswers}></ScaledQuestionTile>
    )
    );
    return (
        <header className="App-header">
            <div id="basic-questions">
                <p>Here, you'll be guided through a simple quiz</p>
                {quizBody}
                <ResultsButton enabled={finished} questions={answeredQs}></ResultsButton>
            </div>
        </header>

    )
}
