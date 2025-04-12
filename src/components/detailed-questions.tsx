// import { Page } from '../custom-types';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { askQuestion } from '../gemini/ai-conversation-handler';

interface DetailedQuestionsProps {
    apiKey:string
}
export function DetailedQuestions({apiKey}: DetailedQuestionsProps): React.JSX.Element {
    const [response, setResponse] = useState("");
    const [textInput, setTextInput] = useState("")
    /**
     * @function askGemini
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

    let handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        askGemini(textInput);
    };
    return (
        <header className="App-header">
            <h1>An AI Enhanced Quiz Experience</h1>
            <p>For individuals who want to explore more specific and nuanced career options.</p>

            <Form>
                <Form.Group>
                    <Form.Text>What type of careers are you interested in exploring today?</Form.Text>
                    <Form.Control type="textarea" onChange={updateText}>
                    </Form.Control>
                    <Button onClick={handleSubmit}>Submit</Button>
                </Form.Group>
            </Form>
            {response && 
                <p>{response}</p>
            }
        </header>
    )
}
