import { Button } from 'react-bootstrap';
import { Page } from '../custom-types';
import React from 'react';
import { ResultsButton } from './results-button';
import { Analysis } from '../interfaces/analysis';
import { QuizRun } from '../interfaces/user';
import './css/menu.css';

interface AnalysesMenuProps {
    selectPage: (page: Page) => void
    quizrun: QuizRun | undefined
    passAnalysis: (analysis: Promise<void | Analysis | undefined>)=>void
    passQuizRun: (run: QuizRun) => void
}
export function AnalysesMenu({selectPage, quizrun, passAnalysis, passQuizRun}: AnalysesMenuProps): React.JSX.Element {
    if (quizrun === undefined) {
        alert(`No previous quiz selected.`);
        selectPage("Home");
        return <div></div>
    }

    function genOnClick(analysis: Analysis) {
        async function createPromise(analysis: Analysis) {
            return analysis;
        }

        return () => {
            passAnalysis(createPromise(analysis));
            selectPage("Results");
        }
    }

    const analysesButtons = quizrun.analyses.map((analysis) => (
        <AnalysesMenuButton analysis={{...analysis}} genOnClick={genOnClick}></AnalysesMenuButton>
    ));
    const newAnalysisButton = <ResultsButton className="menu-button" enabled={true} quizRun={quizrun} selectPage={selectPage} passAnalysis={passAnalysis} passQuizRun={passQuizRun}>Generate Results Again</ResultsButton>;
    const analysesButtonsWithNew = [...analysesButtons, newAnalysisButton];
    return (
        <div id="analyses-menu">
            <h2 id="analyses-menu-text">Choose a previous analysis to view.</h2>
            {analysesButtonsWithNew}
        </div>
    );
}


interface AnalysesMenuButtonProps {
    analysis: Analysis
    genOnClick: (analysis: Analysis) => () => void
}
function AnalysesMenuButton({analysis, genOnClick}: AnalysesMenuButtonProps): React.JSX.Element {
    return <Button className="button-style menu-button" onClick={genOnClick(analysis)}>{analysis.name}</Button>
}
