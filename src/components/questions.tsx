// import { Page } from '../custom-types';

// interface QuestionsProps {
//     selectPage: (value: Page) => void
// }
export function Questions(/* {detailed}: QuestionsProps */): React.JSX.Element {
    return (
        <header className="App-header">
            {
                localStorage.getItem("continueDetailed") === "true" ?
                    <p>Here, you'll be asked detailed questions</p>
                :   <p>Here, you'll be guided through a simple quiz </p>
            }
        </header>
    )
}
