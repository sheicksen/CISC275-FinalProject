import "./navbar.css";
import {Button} from "react-bootstrap";
import { Page } from '../custom-types';
import { loggedIn, logOut } from "../functions/login";

/*
    DESCRIPTION: Basic Navbar code
    CREATED BY: Leif Keane
    CREATED DATE: 3/20/2025
    UPDATED BY: Sophia Heicksen
    LAST UPDATED: 4/1/2025
*/
interface NavBarProps {
    selectPage: (value:Page) => void,
    // logOut: () => void,
    // loggedIn:boolean
}
export function NavBar ({ selectPage/* , logOut, loggedIn */ }:NavBarProps) : React.JSX.Element{
    return (
        <div>
            <div className="mynavbar">
                {/*MAIN NAVBAR CODE*/}
                {/* <div className="nav-button"> */}
                    <img src="https://imgur.com/jPdH44f.png" alt = "pingas" className = "test-image"/>
                    <Button className="nav-button button-style" onClick={()=>{
                        selectPage("Home");
                    }}>Home</Button>
                    { loggedIn() && 
                        <Button className="nav-button button-style" onClick={()=>{
                            selectPage("Results");
                        }}>Results</Button> // Results page is only accessible to logged in users
                    }
                    { loggedIn() &&
                        <div id="welcome">Welcome, {loggedIn()}</div>
                    }
                    <Button className="nav-button button-style rightalign" onClick={() => {
                        loggedIn() ? logOut() : selectPage("Login");
                    }}>{
                        loggedIn() ? "Log Out" : "Log In / Sign Up"
                    }</Button>
                {/* </div> */}
                {/*^ Buttons ^*/}
            </div>
        </div>
    )
}
