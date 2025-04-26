// import { Page } from '../custom-types';

import { generateResults } from "../gemini/ai-conversation-handler"
import { Question } from "../interfaces/question"
import { useState } from "react"


interface ResultsProps {
    setLoading: React.Dispatch<React.SetStateAction<string>>,
    questions: Question[]
}
export function Results({setLoading, questions}: ResultsProps): React.JSX.Element {
    let [results, setResults] = useState<string>("");

    function getResults(){
        setResults("Working on it...")
        setLoading("Loading Results");
        generateResults(questions).then(
            (value) => {
                if(typeof value === 'string'){
                    setResults(value)
                    setLoading("")
                }      
            }
        ).catch((error)=>{
            setResults(error)
        });
    }
    if (results===""){
        console.log("Getting results")
        getResults();
    }
    return (
        <div id="results">
            <p>Here, you'll see your results from previous quizzes</p>
            {results}
        </div>
    )
}
