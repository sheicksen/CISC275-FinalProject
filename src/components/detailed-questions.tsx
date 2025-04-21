import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { askQuestion, generateQuestions } from '../gemini/ai-conversation-handler';
import { Question, isText} from '../interfaces/question';
import { TextQuestionTile } from './text-question';
import { ScaledQuestionTile } from './scaled-question';
import { ProgBar } from './progress-bar';
import { ResultsButton } from './results-button';

interface DetailedQuestionsProps {
    apiKey:string
    setLoading: React.Dispatch<React.SetStateAction<string>>
}
let quizLength = 7;
export function DetailedQuestions({apiKey, setLoading}: DetailedQuestionsProps): React.JSX.Element {
    const [response, setResponse] = useState("");
    const [textInput, setTextInput] = useState("")
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answeredQs, setAnsweredQs] = useState<Question[]>([]);
    /**
     * @function askGemini sends Gemini raw text and sets response to the returned answer.
     * @param {string} question a string containing what you would like to ask Gemini.
     */
    function askGemini(question:string){
        let answer: Promise<string | undefined> = askQuestion(apiKey, question);
        answer
            .then((value) => {
                if (value){
                    console.log(value);
                    setResponse(value);
                }
            })
            .catch((error)=>{
                console.log(error);
                setResponse("Oops, something went wrong. Try again later.");
                setLoading("");
            });
    }
    let updateText = (event:React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(event.target.value);
    };

    let getQuestions = (event: React.MouseEvent<HTMLButtonElement>) => {
        setLoading("Loading Questions");
        askGemini(("Give me an intro of at most 3 sentences to a career quiz exploring options with " + textInput));
        let questions: Promise<Question[]> = generateQuestions(apiKey, textInput);
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
        isText(question) ? <TextQuestionTile id={index} question={question} passAnswer={updateAnswers}></TextQuestionTile> : 
        <ScaledQuestionTile id = {index} question={{...question}} passAnswer={updateAnswers}></ScaledQuestionTile>
    )
    );
    let careerPrompt = (
        <Form>
            <Form.Group>
                <Form.Text>What type of career fields are you interested in exploring today?</Form.Text>
                <Form.Control type="textarea" onChange={updateText}>
                </Form.Control>
                <Button onClick={getQuestions}>Get your quiz</Button>
            </Form.Group>
        </Form>);
    return (
        <header className="App-header">
            <h1>An AI Enhanced Quiz Experience</h1>
            <p>For individuals who want to explore more specific and nuanced career options.</p>
            {response === "" && careerPrompt}
            <div style={{maxWidth:"70vw", textAlign:"center"}}>{response}</div>
            {questions.length > 0 && <div>
                <ProgBar totalQuestions={quizLength} answeredQuestions={answeredQs.length}></ProgBar>
                {quizBody}
                <ResultsButton enabled={isFinished()} questions={answeredQs}></ResultsButton>
            </div>
            }

        </header>
    )
}
