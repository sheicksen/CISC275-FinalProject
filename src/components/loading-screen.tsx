import "./css/loading-screen.css"
import { useState } from "react"

const delay = 300;

interface LoadingScreenProps {
    text: string
}
export function LoadingScreen({text}: LoadingScreenProps): React.JSX.Element {
    // const [_, set_] = useState<boolean>(false);
    // function reload(): void {set_(!_)}
    const [dots, setDots] = useState<number>(0);

    window.setTimeout(() => {setDots(dots === 3 ? 0 : dots + 1)}, delay);

    return (
        <div id="loading-screen">
            { `${text}${".".repeat(dots)}` }
        </div>
    )
}
