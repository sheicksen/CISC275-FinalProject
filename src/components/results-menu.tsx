import { Button } from 'react-bootstrap';
import { Page } from '../custom-types';
import { loggedIn } from '../functions/login';
import { loadCurrentUser } from '../functions/storage';
import { QuizRun } from '../interfaces/user';
import React from 'react';

interface ResultsMenuProps {
    selectPage: (page:Page)=> void
    passQuizRun: (run: QuizRun) => void
}
export function ResultsMenu({selectPage, passQuizRun}: ResultsMenuProps): React.JSX.Element {
    const user = loadCurrentUser();
    if (user === undefined) {
        alert(`User "${loggedIn()}" does not exist.`);
        selectPage("Home");
        return <div></div>
    }

    const quizRunButtons = user.quizzes.map((quizrun) => (
        <ResultsMenuButton run={{...quizrun}} passQuizRun={passQuizRun}></ResultsMenuButton>
    ));
    return (
        <div id="results-menu">
            <p id="results-menu-text">Choose a previous quiz run to view the results from.</p>
            {quizRunButtons.length ? quizRunButtons : <p>Please return to Home and take a quiz!</p>}
        </div>
    )
}


interface ResultsMenuButtonProps {
    run: QuizRun
    passQuizRun: (run: QuizRun) => void
}
function ResultsMenuButton({run, passQuizRun}: ResultsMenuButtonProps): React.JSX.Element {
    return <Button className="button-style" onClick={() => {passQuizRun(run)}}>{run.responses.name}</Button>
}
