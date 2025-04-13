import './App.css';
import React, { useState } from 'react';
import { Page } from './custom-types';
import { Button, Form } from 'react-bootstrap';
import { NavBar } from './components/navbar';
import { Home } from './components/home'
import { Results } from './components/results';
import { DetailedQuestions } from './components/detailed-questions';
import { BasicQuestions } from './components/basic-questions';
import { Login } from './components/login';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
    keyData = JSON.parse(prevKey);
}


function App() {
    const [key, setKey] = useState<string>(keyData); //for api key input
    const [page, setPage] = useState<Page>("Home"); // determines what page the app displays
    
    //sets the local storage item to the api key the user inputed
    function handleSubmit() {
        localStorage.setItem(saveKeyData, JSON.stringify(key));
        window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
    }

    //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
    function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
        setKey(event.target.value);
    }
    //instead of urls, changes which 'page' will be visible to the user.
    function changePage(value: Page) {
        setPage(value);
    }

    const pages = new Map<Page, React.JSX.Element>([
        ["Home",               <Home selectPage={changePage}></Home>    ],
        ["Results",            <Results></Results>                      ],
        ["Detailed Questions", <DetailedQuestions apiKey={key}></DetailedQuestions>  ],
        ["Basic Questions",    <BasicQuestions></BasicQuestions>        ],
        ["Login",              <Login selectPage={changePage}></Login>  ]
    ]);

    return (
        <div className="App">
            <NavBar selectPage={changePage}></NavBar>
            <div id="app-body">
                <div className="page">
                    { pages.get(page) }
                </div>
                <div className="footer">
                    <Form>
                        <Form.Label>API Key:</Form.Label>
                        <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
                        <br></br>
                        <Button className="button-style" onClick={handleSubmit}>Submit</Button>
                    </Form>
                    <p> Sophia Heicksen, Samhain Ackerman, Leif Keane, Henry Leap </p>
                </div>
            </div>
        </div>
    );
}

export default App;
