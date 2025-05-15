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
    return questions.map((question) => ({...question, answer: undefined}));
}

const questions: Question[] = parseQuestions(genericQuestions[0]);

interface BasicQuestionsProps {
    selectPage: (page: Page) => void
    passAnalysis: (analysis: Promise<void | Analysis | undefined>) => void
    passQuizRun: (run: QuizRun) => void
}
export function BasicQuestions({selectPage, passAnalysis, passQuizRun}: BasicQuestionsProps): React.JSX.Element {
    const [answeredQs, setAnsweredQs] = useState<Question[]>([]);
    const [popupEnabled, setPopupEnabled] = useState<boolean>(true);

    function updateAnswers(id: number, q: Question, answer: string | number) {
        const sameQuestion = answeredQs.filter((question) => (question.question === q.question));
        if (sameQuestion.length > 0) {
            const differentQuestion = answeredQs.filter((question) => (question.question !== q.question));
            const editedAnswers = [...differentQuestion, {...sameQuestion[0], answer}];
            setAnsweredQs(editedAnswers);
        } else {
            const amendedAnswers = [...answeredQs, {...q, answer}];
            setAnsweredQs(amendedAnswers);
        }
    }

    function isFinished(): boolean {
        return questions.length === answeredQs.length;
    }
    const quizBody = questions.map((question, index) => (
        <ScaledQuestionTile key={index} id={index} question={{...question}} passAnswer={updateAnswers}></ScaledQuestionTile>
    ));

    const quizRun: QuizRun = {
        responses: {name: "", type: "basic", questions: answeredQs},
        analyses: []
    }
    return (
        <div id="basic-questions">
            <div className="title-card">
                {isFinished() && popupEnabled && <CompletionAlert setEnabled={setPopupEnabled} quizRun={quizRun} selectPage={selectPage} passAnalysis={passAnalysis} passQuizRun={passQuizRun}></CompletionAlert>}
                <h1 className="quiz-title">Basic Quiz</h1>
                <p className="quiz-text">Here, you'll be guided through a simple quiz to gauge your interests.</p>
                {quizBody}
            </div>
            <ProgBar totalQuestions={quizLength} answeredQuestions={answeredQs.length}></ProgBar>
            <ResultsButton enabled={isFinished()} quizRun={quizRun} selectPage={selectPage} passAnalysis={passAnalysis} passQuizRun={passQuizRun}></ResultsButton>
        </div>
    );
}
