import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { askQuestion, generateQuestions } from '../gemini/ai-conversation-handler';
// import {generateQuestions } from '../gemini/ai-conversation-handler';
import { BasicQuestion} from '../interfaces/question';
import { TextQuestionTile } from './text-question';
import { ScaledQuestionTile } from './scaled-question';
import { ProgBar } from './progress-bar';

interface DetailedQuestionsProps {
    apiKey:string
}
let quizLength = 7;
export function DetailedQuestions({apiKey}: DetailedQuestionsProps): React.JSX.Element {
    const [response, setResponse] = useState("");
    const [textInput, setTextInput] = useState("")
    const [questions, setQuestions] = useState<BasicQuestion[]>([]);
    const[answers, setAnswers] = useState<string[]>([]);
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
              }
            )
            .catch((error)=>{
                console.log(error);
                setResponse("Oops, something went wrong. Try again later.");
            });
    }
    let updateText = (event:React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(event.target.value);
    };

    let getQuestions = (event: React.MouseEvent<HTMLButtonElement>) => {
        askGemini(("Give me an intro of at most 3 sentences to a career quiz exploring options with " + textInput));
        let questions: Promise<BasicQuestion[]> = generateQuestions(apiKey, textInput);
        questions 
            .then((value)=>{
                console.log(value);
                setQuestions(value);
            })
            .catch((error) => {
                console.log(error);
            })

    };
    let updateAnswers = (answer:string) =>{
        // let search:AnsweredQ[]= answeredQs.filter((question)=>question.question===q.question);
        // let otherQs:AnsweredQ[] = answeredQs.filter((question)=>question.question !== q.question);
        // let answeredQ: AnsweredQ;
        // if(q.type === "scaled"){
        //     answeredQ = {...q, answer:parseInt(answer)}
        // } else {
        //     answeredQ = {...q, answer:answer}
        // }

        // setAnsweredQs([...otherQs, answeredQ])
        setAnswers([...answers, answer]);
    }
    let quizBody = questions.map((question, index)=>(
        question.type === "text" ? <TextQuestionTile id={index} question={question} passAnswer={updateAnswers}></TextQuestionTile> : 
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
                <ProgBar totalQuestions={quizLength} answeredQuestions={answers.length}></ProgBar>
                {quizBody}
            </div>
            }
        </header>
    )
}
