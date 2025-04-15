// import { Page } from '../custom-types';

import { generateResults } from "../gemini/ai-conversation-handler"


interface ResultsProps {
    setLoading: React.Dispatch<React.SetStateAction<string>>
}
export function Results({setLoading}: ResultsProps): React.JSX.Element {
    setLoading("Loading Results");
    generateResults(localStorage.getItem("MYKEY") || "","placeholder").then((v) => {
        // set some vars in the above function (likely using setStates)
        setLoading("");
    });
    return (
        <div id="results">
            <p>Here, you'll see your results from previous quizzes</p>
        </div>
    )
}
