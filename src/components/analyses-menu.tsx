import { Button } from 'react-bootstrap';
import { Page } from '../custom-types';
import React from 'react';
import { ResultsButton } from './results-button';
import { Analysis } from '../interfaces/analysis';
import { Career } from '../interfaces/career';
import { QuizRun } from '../interfaces/user';

interface AnalysesMenuProps {
    selectPage: (page: Page) => void
    quizrun: QuizRun
    passResults: (questions:Promise<void | Career[] | undefined>)=>void
}
export function AnalysesMenu({selectPage, quizrun, passResults}: AnalysesMenuProps): React.JSX.Element {
    const analysesButtons = quizrun.analyses.map((analysis) => (
        <AnalysesMenuButton analysis={{...analysis}} passResults={passResults} selectPage={selectPage}></AnalysesMenuButton>
    ));
    const newAnalysisButton = <ResultsButton enabled={true} questions={quizrun.responses.questions} selectPage={selectPage} passResults={passResults}></ResultsButton>;
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
    passResults: (questions:Promise<void | Career[] | undefined>)=>void
    selectPage: (page: Page) => void
}
function AnalysesMenuButton({analysis, passResults}: AnalysesMenuButtonProps): React.JSX.Element {
    async function createPromise(careers: Career[]) {
        return careers;
    }
    return <Button className="button-style" onClick={() => {passResults(createPromise(analysis.careers))}}>{analysis.name}</Button>
}
