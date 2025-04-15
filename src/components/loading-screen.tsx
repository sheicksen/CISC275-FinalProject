import "./css/loading-screen.css"
import { useState } from "react"

const delay = 300;
const dotrange = {low: 0, high: 3};

interface LoadingScreenProps {
    text: string
}
export function LoadingScreen({text}: LoadingScreenProps): React.JSX.Element {
    // const [_, set_] = useState<boolean>(false);
    // function reload(): void {set_(!_)}
    const [dots, setDots] = useState<number>(dotrange.low);

    window.setTimeout(() => {setDots(dots >= dotrange.high ? dotrange.low : dots + 1)}, delay);

    return (
        <div id="loading-screen">
            <div id="text">{ text }<span id="dots">{".".repeat(dots)}</span></div>
        </div>
    )
}
