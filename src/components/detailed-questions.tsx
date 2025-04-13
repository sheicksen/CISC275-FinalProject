// import { Page } from '../custom-types';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { askQuestion, generateQuestions } from '../gemini/ai-conversation-handler';
import { Question } from '../interfaces/question';

interface DetailedQuestionsProps {
    apiKey:string
}
export function DetailedQuestions({apiKey}: DetailedQuestionsProps): React.JSX.Element {
    const [response, setResponse] = useState("");
    const [textInput, setTextInput] = useState("")
    const [questions, setQuestions] = useState<Question<"scaled" | "text">[]>([]);
    /**
     * @function askGemini
     */
    function askGemini(question:string){
        let answer: Promise<string | undefined> = askQuestion(apiKey, question);
        // let answer: Promise<string | undefined> = generateQuestions(apiKey, question);
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
        let questions: Promise<Question<"scaled" | "text">[]> = generateQuestions(apiKey, textInput);
        questions 
            .then((value)=>{
                console.log(value);
                setQuestions(value);
            })
            .catch((error) => {
                console.log(error);
            })

    };
    return (
        <header className="App-header">
            <h1>An AI Enhanced Quiz Experience</h1>
            <p>For individuals who want to explore more specific and nuanced career options.</p>

            <Form>
                <Form.Group>
                    <Form.Text>What type of career fields are you interested in exploring today?</Form.Text>
                    <Form.Control type="textarea" onChange={updateText}>
                    </Form.Control>
                    <Button onClick={getQuestions}>Get your quiz</Button>
                </Form.Group>
            </Form>
            {response && 
                <p>{response}</p>
            }
            {questions.length > 0 &&
                <p>{questions[0].question}</p>

            }
        </header>
    )
}
