import './App.css';
import React, { useState } from 'react';
import { Page } from './custom-types';
import { Button, Form } from 'react-bootstrap';
import { NavBar } from './components/navbar';
import { Home } from './components/home';
import { Results } from './components/results';
import { DetailedQuestions } from './components/detailed-questions';
import { BasicQuestions } from './components/basic-questions';
import { Login } from './components/login';
import { LoadingScreen } from './components/loading-screen';
import { getAPIKey, setAPIKey } from './gemini/ai-conversation-handler';
import deployDate from './resources/date.json';
import { ResultsMenu } from './components/results-menu';
import { QuizRun } from './interfaces/user';
import { AnalysesMenu } from './components/analyses-menu';
import { Analysis } from './interfaces/analysis';
import { removeAnalysis } from './functions/storage';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = getAPIKey();
// const saveKeyData = "MYKEY";
// const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
// if (prevKey !== null) {
//     keyData = JSON.parse(prevKey);
// }


function App() {
    const [key, setKey] = useState<string>(keyData); //for api key input
    const [page, setPage] = useState<Page>("Home"); // determines what page the app displays
    const [loading, setLoading] = useState<string>("");
    const [analysis, setAnalysis] = useState<Promise<void | Analysis | undefined>>();
    const [run, setRun] = useState<QuizRun | undefined>()
    const [refresher, setRefresher] = useState<boolean>(false);
    // console.log("updated app", analysis)

    //sets the local storage item to the api key the user inputed
    function handleSubmit() {
        setAPIKey(key);
        window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
    }

    //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
    function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
        setKey(event.target.value);
    }
    //instead of urls, changes which 'page' will be visible to the user.
    function changePage(value: Page) {
        async function undefinedPromise() { return undefined; }
        if (value !== "Results Menu" && value !== "Analyses Menu" && value !== "Results")
            setRun(undefined);
        if (value !== "Analyses Menu" && value !== "Results")
            setAnalysis(undefinedPromise());

        setPage(value);
    }

    function passAnalysis(analysis: Promise<void | Analysis | undefined>):void{
        setAnalysis(analysis);
    }

    function passQuizRun(run: QuizRun) {
        setRun(run);
    }

    async function setQuizRunName(name: string) {
        // console.log(name);
        if (run) setRun({...run, responses: {...run.responses, name}});

        async function analysisPromise(analysis: Analysis) {
            return analysis;
        }
        const ansys = await analysis;
        if (ansys) setAnalysis(analysisPromise({...ansys, responseSet: name}));
    }

    async function setAppAnalysisName(name: string) {
        async function analysisPromise(analysis: Analysis) {
            return analysis;
        }
        const ansys = await analysis;
        if (ansys) setAnalysis(analysisPromise({...ansys, name}));

        if (run && ansys) {
            const newAnalyses = [...removeAnalysis(ansys, run.analyses), ansys];
            setRun({...run, analyses: newAnalyses});
        }
    }

    function refreshApp() {
        setRefresher(!refresher);
    }

    const pages = new Map<Page, React.JSX.Element>([
        ["Home",               <Home selectPage={changePage}></Home>    ],
        ["Results",            <Results setLoading={setLoading} promisedAnalysis={analysis} setQuizRunName={setQuizRunName} setAppAnalysisName={setAppAnalysisName} refreshApp={refreshApp}></Results>],
        ["Detailed Questions", <DetailedQuestions selectPage={changePage} setLoading={setLoading} passAnalysis={passAnalysis} passQuizRun={passQuizRun}></DetailedQuestions>  ],
        ["Basic Questions",    <BasicQuestions selectPage={changePage} passAnalysis={passAnalysis} passQuizRun={passQuizRun}></BasicQuestions> ],
        ["Login",              <Login selectPage={changePage}></Login>  ],
        ["Results Menu",       <ResultsMenu selectPage={changePage} passQuizRun={passQuizRun}></ResultsMenu>],
        ["Analyses Menu",      <AnalysesMenu selectPage={changePage} quizrun={run} passAnalysis={passAnalysis} passQuizRun={passQuizRun}></AnalysesMenu>]
    ]);

    return (
        <div className="App">
            <NavBar selectPage={changePage}></NavBar>
            <div id="app-body">
                <div className="page">
                    { pages.get(page) }
                </div>
                <div className="footer">
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>API Key:</Form.Label>
                        <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
                        <br></br>
                        <Button className="button-style" style={{backgroundColor: "#1d426d"}} onClick={handleSubmit}>Submit</Button>
                    </Form>
                    <p> Sophia Heicksen, Samhain Ackerman, Leif Keane, Henry Leap | Date of most recent deploy: {deployDate} </p>
                </div>
            </div>
            {loading && <LoadingScreen text={loading}></LoadingScreen>}
        </div>
    );
}

export default App;
