import { Button } from 'react-bootstrap';
import { Page } from '../custom-types';
import React from 'react';
import { ResultsButton } from './results-button';
import { Analysis } from '../interfaces/analysis';
import { QuizRun } from '../interfaces/user';

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

    const analysesButtons = quizrun.analyses.map((analysis) => (
        <AnalysesMenuButton analysis={{...analysis}} passAnalysis={passAnalysis} selectPage={selectPage}></AnalysesMenuButton>
    ));
    const newAnalysisButton = <ResultsButton enabled={true} questions={quizrun.responses.questions} selectPage={selectPage} passAnalysis={passAnalysis} passQuizRun={passQuizRun}></ResultsButton>;
    const analysesButtonsWithNew = [...analysesButtons, newAnalysisButton];
    return (
        <div id="analyses-menu">
            <p id="analyses-menu-text">Choose a previous analysis to view.</p>
            {analysesButtonsWithNew}
        </div>
    );
}


interface AnalysesMenuButtonProps {
    analysis: Analysis
    passAnalysis: (analysis: Promise<void | Analysis | undefined>)=>void
    selectPage: (page: Page) => void
}
function AnalysesMenuButton({analysis, passAnalysis}: AnalysesMenuButtonProps): React.JSX.Element {
    async function createPromise(analysis: Analysis) {
        return analysis;
    }
    return <Button className="button-style" onClick={() => {passAnalysis(createPromise(analysis))}}>{analysis.name}</Button>
}
