import { Button } from 'react-bootstrap';
import { Page } from '../custom-types';
import { loggedIn } from '../functions/login';
import { loadCurrentUser } from '../functions/storage';
import { QuizRun } from '../interfaces/user';
import React from 'react';
import './css/menu.css';

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

    function genOnClick(run: QuizRun) {
        return () => {
            passQuizRun(run);
            selectPage("Analyses Menu");
        }
    }

    const quizRunButtons = user.quizzes.map((quizrun) => (
        <ResultsMenuButton run={{...quizrun}} genOnClick={genOnClick}></ResultsMenuButton>
    ));
    return (
        <div id="results-menu">
            <h2 id="results-menu-text">Choose a previous quiz run to view the results from.</h2>
            {quizRunButtons.length ? quizRunButtons : <p>Please return to Home and take a quiz!</p>}
        </div>
    )
}


interface ResultsMenuButtonProps {
    run: QuizRun
    genOnClick: (run: QuizRun) => () => void
}
function ResultsMenuButton({run, genOnClick}: ResultsMenuButtonProps): React.JSX.Element {
    return <Button className="button-style menu-button" onClick={genOnClick(run)}>{run.responses.name}</Button>
}
