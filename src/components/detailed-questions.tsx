import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { askQuestion, generateQuestions } from '../gemini/ai-conversation-handler';
import { Question, isText} from '../interfaces/question';
import { TextQuestionTile } from './text-question';
import { ScaledQuestionTile } from './scaled-question';
import { ProgBar } from './progress-bar';
import { ResultsButton } from './results-button';
import { Page } from '../custom-types';
import { validateText } from '../functions/validation';
import { CompletionAlert } from './completion-alert';
import "../components/css/detailed-questions.css";
import "../App.css";
import { preventFormSubmitReload } from '../functions/form-submit';
import { Analysis } from '../interfaces/analysis';
import { QuizRun } from '../interfaces/user';

interface DetailedQuestionsProps {
    // apiKey:string
    setLoading: React.Dispatch<React.SetStateAction<string>>,
    selectPage: (page:Page)=>void
    passAnalysis: (analysis: Promise<void | Analysis | undefined>)=>void
    passQuizRun: (run: QuizRun) => void
}
export function DetailedQuestions({/* apiKey,  */setLoading, selectPage, passAnalysis, passQuizRun}: DetailedQuestionsProps): React.JSX.Element {
    const [response, setResponse] = useState("");
    const [textInput, setTextInput] = useState("")
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answeredQs, setAnsweredQs] = useState<Question[]>([]);
    const [validPrompt, setValidPrompt] = useState<boolean>(false);
    const [popupEnabled, setPopupEnabled] = useState<boolean>(true);
    /**
     * @function askGemini sends Gemini raw text and sets response to the returned answer.
     * @param {string} question a string containing what you would like to ask Gemini.
     */
    function askGemini(question:string){
        let answer: Promise<string | undefined> = askQuestion(question);
        answer
            .then((value) => {
                if (value){
                    console.log(value);
                    setResponse(value);
                }
            })
            .catch((error)=>{
                console.log(error);
                setResponse("Oops, Gemini is unavailable. Try again later.");
                setLoading("");
            });
    }
    let updateText = (event:React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(event.target.value);
        if (validateText(event.target.value)){
            setValidPrompt(true);
        } else {
            setValidPrompt(false);
        }
    };

    let getQuestions = () => {
        setLoading("Loading Questions");
        askGemini(("Give me an intro of at most 3 sentences to a career quiz exploring options with " + textInput));
        let questions: Promise<Question[]> = generateQuestions(textInput);
        questions 
            .then((value)=>{
                console.log(value);
                setQuestions(value);
                setLoading("");
            })
            .catch((error) => {
                console.log(error);
            })

    };
    let updateAnswers = (q: Question, answer: string | number) => {
        let search:Question[] = answeredQs.filter((question)=>question.question===q.question);
        if(search.length > 0){
            let qAnswer: string = typeof search[0].answer === 'string' ? search[0].answer : "";
            let editedAnswers: Question[];
            if(search[0].type === "text" && !validateText(qAnswer)){
                editedAnswers = answeredQs.filter((question) => question.question !== q.question);
            } else{
                editedAnswers = [...answeredQs.filter((question)=>question.question !== q.question), {...search[0], answer:answer}]
            }
            setAnsweredQs(editedAnswers);
        } else {
            let addedAnswer = [...answeredQs, {...q, answer:answer}];
            if (typeof answer === 'number' || validateText(answer)){
                setAnsweredQs(addedAnswer);
            }
        }
    }
    function isFinished():boolean{
        return( questions.length === answeredQs.length && questions.length !== 0);
    }
    let quizBody = questions.map((question, index)=>(
        isText(question) ? <TextQuestionTile key={index} id={index} question={question} passAnswer={updateAnswers}></TextQuestionTile> : 
        <ScaledQuestionTile key={index} id={index} question={{...question}} passAnswer={updateAnswers}></ScaledQuestionTile>
    )
    );
    let careerPrompt = (
        <Form onSubmit={(e) => {preventFormSubmitReload(e); getQuestions()}}>
            <Form.Group>
                <Form.Text>What type of career fields are you interested in exploring today?</Form.Text>
                <Form.Control type="textarea" onChange={updateText}>
                </Form.Control>
                <Button className="button-style" onClick={getQuestions} disabled={!validPrompt}>{validPrompt ? "Get your quiz" : "Enter prompt"}</Button>
            </Form.Group>
        </Form>);

    const quizRun: QuizRun = {
        responses: {name: "", type: "detailed", questions: answeredQs},
        analyses: []
    }
    return (
        <div id="detailed-questions">
            <div id="prompt-card">
                <h1>An AI Enhanced Quiz Experience</h1>
                {isFinished() && popupEnabled && <CompletionAlert setEnabled={setPopupEnabled} quizRun={quizRun} selectPage={selectPage} passAnalysis={passAnalysis} passQuizRun={passQuizRun}></CompletionAlert>}
                <p style={{margin: "15px auto", textAlign:"center"}}>For individuals who want to explore more specific and nuanced career options.</p>
                {response === "" && careerPrompt}
                <div style={{maxWidth:"70vw", textAlign:"center"}} id="description">{response}</div>
            </div>
            {questions.length > 0 && <div>
                {quizBody}
                <ProgBar totalQuestions={questions.length} answeredQuestions={answeredQs.length}></ProgBar>
                <ResultsButton enabled={isFinished()} quizRun={quizRun} selectPage={selectPage} passAnalysis={passAnalysis} passQuizRun={passQuizRun}></ResultsButton>
            </div>
            }

        </div>
    )
}
