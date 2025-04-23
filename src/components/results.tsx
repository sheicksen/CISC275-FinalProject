// import { Page } from '../custom-types';

import { generateResults } from "../gemini/ai-conversation-handler"
import { Question } from "../interfaces/question"


interface ResultsProps {
    setLoading: React.Dispatch<React.SetStateAction<string>>,
    questions: Question[]
}
export function Results({setLoading, questions}: ResultsProps): React.JSX.Element {
    setLoading("Loading Results");
    generateResults(questions).then((v) => {
        // set some vars in the above function (likely using setStates)
        setLoading("");
    });
    return (
        <div id="results">
            <p>Here, you'll see your results from previous quizzes</p>
        </div>
    )
}
