import { Question, QuestionType} from "../interfaces/question";
import QuestionData from "../resources/basic-questions.json";
import { useState } from "react";
import { ScaledQuestionTile } from "./scaled-question";
import { ResultsButton } from "./results-button";
import { ProgBar } from "./progress-bar";
import { Page } from '../custom-types';
import { CompletionAlert } from "./completion-alert";
import "./css/basic-quiz.css"
import { Analysis } from "../interfaces/analysis";
import { QuizRun } from "../interfaces/user";

interface GenericQuestion {
    question: string,
    type: QuestionType,
    scale:string[],
}
const genericQuestions = QuestionData as GenericQuestion[][];
const quizLength = genericQuestions[0].length;

function parseQuestions(questions: GenericQuestion[]): Question[]{
    let parsedQuestions: Question[] = [];

    for (let i = 0; i < questions.length; i++){
       parsedQuestions.push({...questions[i], answer: undefined});
    }
    return parsedQuestions;
}

let questions: Question[] = parseQuestions(genericQuestions[0]);

interface BasicQuestionsProps {
    selectPage: (page:Page)=> void
    passAnalysis: (analysis: Promise<void | Analysis | undefined>)=>void
    passQuizRun: (run: QuizRun) => void
}
export function BasicQuestions({selectPage, passAnalysis, passQuizRun}:BasicQuestionsProps): React.JSX.Element {
    let [answeredQs, setAnsweredQs] = useState<Question[]>([]);
    const [popupEnabled, setPopupEnabled] = useState<boolean>(true);
    let updateAnswers = (id:number, q:Question, answer:string | number) =>{
        let search:Question[] = answeredQs.filter((question)=>question.question===q.question);
        if(search.length > 0){
            let editedAnswers:Question[] = [...answeredQs.filter((question)=>question.question !== q.question), {...search[0], answer:answer}]
            setAnsweredQs(editedAnswers);
        } else {
            let addedAnswer = [...answeredQs, {...q, answer:answer}];
            setAnsweredQs(addedAnswer);
        }
    }
    function isFinished():boolean{
        return questions.length === answeredQs.length;
    }
    let quizBody = questions.map((question, index)=>(
        <ScaledQuestionTile id = {index} question={{...question}} passAnswer={updateAnswers}></ScaledQuestionTile>
    )
    );
    return (
        <div className="App-header">
            <div id="basic-questions">
            <div style={{backgroundColor: "#12161e", borderRadius: "15px"}}>
                {isFinished() && popupEnabled && <CompletionAlert setEnabled={setPopupEnabled} questions={answeredQs} selectPage={selectPage} passAnalysis={passAnalysis} passQuizRun={passQuizRun}></CompletionAlert>}
                <h1 className="quiz-title">Basic Quiz</h1>
                <p className="quiz-text">Here, you'll be guided through a simple quiz to gauge your interests.</p>
                </div>
                {quizBody}
                
                <ProgBar totalQuestions={quizLength} answeredQuestions={answeredQs.length}></ProgBar>
                <ResultsButton enabled={isFinished()} questions={answeredQs} selectPage={selectPage} passAnalysis={passAnalysis} passQuizRun={passQuizRun}></ResultsButton>
            </div>
        </div>

    )
}
