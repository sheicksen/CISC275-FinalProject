// import { Page } from '../custom-types';

import { generateResults } from "../gemini/ai-conversation-handler"
import { Question } from "../interfaces/question"
import { useState } from "react"
import { Career } from "../interfaces/career"


interface ResultsProps {
    setLoading: React.Dispatch<React.SetStateAction<string>>,
    questions: Question[]
}
export function Results({setLoading, questions}: ResultsProps): React.JSX.Element {
    let [results, setResults] = useState<Career[]>([]);

    function getResults(){
        setLoading("Loading Results");
        generateResults(questions).then(
            (value) => {
                if(value !== undefined){
                    setResults(value)
                    setLoading("")
                }      
            }
        ).catch((error)=>{
            setResults(error)
        });
    }

    if (results.length === 0 && questions.length > 0){
        setResults([{jobTitle:"Working on it", jobDescription:"...", reasonForReccomendation:"...", avgSalary:"$0", educationLevel:"..."}])
        getResults();
    }
    return (
        <div id="results">
            <p>Here, you'll see your results from previous quizzes</p>
        </div>
    )
}
