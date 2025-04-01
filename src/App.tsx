import React, { useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
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
  
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }
  return (
    <div><NavBar></NavBar>
    <div className="App">
      <header className="App-header">
        <h1> Seeking Answers?</h1>
        <p> ajdslfjdskfjklsdjfkldsjklfjsdklfds</p>
        <Button className="button-style" style = {{fontSize: "50px"}}>Start Quiz</Button>
        <a href="https://www.youtube.com/" style = {{fontSize: "15px"}}> detailed quiz</a>
      </header>
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
