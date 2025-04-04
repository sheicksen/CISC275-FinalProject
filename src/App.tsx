import React, { useState } from 'react';
import { Page } from './custom-types';
import './App.css';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { NavBar } from './components/navbar';

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
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  
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
  function changePage(value:Page){
    setPage(value);
  }
  function logIn(){
    setLoggedIn(true);
  }
  return (
    <div><NavBar selectPage={changePage} logIn={logIn} loggedIn={loggedIn}></NavBar>
    { page === "Home" && 
          <header className="App-header">
            <Container>
              <Row>
                <Col>
                  <div className="image-container">
                    <img alt="Cool graphic of people with careers"></img>
                  </div>
                </Col>
                <Col>
                  <h1> Seeking Answers?</h1>
                  <p>Not sure where you see yourself in the future? You're only one click away from finding out.</p>
                  <Button className="button-style basic-quiz-button" style = {{fontSize: "45px"}} onClick={()=>{changePage("Basic Questions")}}>Start Quiz</Button> <br/>
                  <div>
                  <p style={{fontSize: "24px", display:"inline"}}>Have some extra time to spend? Try out our </p>
                  <button className="link-button" style = {{fontSize: "24px"}} onClick={()=>{changePage("Detailed Questions")}}>Detailed Quiz</button>
                  </div>
                </Col>
              </Row>
            </Container>
            
          </header>
    }
    { (page === "Results" && loggedIn) &&
      <header className="App-header">
        <p>Here, you'll see your results from previous quizzes</p>
      </header>
    }
    { (page === "Basic Questions") &&
      <header className="App-header">
        <p>Here, you'll be guided through a simple quiz </p>
      </header>
    }
    { (page === "Detailed Questions") &&
      <header className="App-header">
        <p>Here, you'll be asked detailed questions</p>
      </header>
    }
    <div className="App">
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
