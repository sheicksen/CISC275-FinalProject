import "./css/completion-alert.css";

// interface CompletionAlertProps {
//     enabled: boolean
// }
export function CompletionAlert(/* {enabled}: CompletionAlertProps */) {
    return (
        <div id="completion-alert">
            You've completed all of the questions.
            <br></br>
            Click below for results!
        </div> 
    );
}
