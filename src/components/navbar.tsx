import {Button} from "react-bootstrap";
import { Page } from '../custom-types';

/*
    DESCRIPTION: Basic Navbar code
    CREATED BY: Leif Keane
    CREATED DATE: 3/20/2025
    UPDATED BY: Sophia Heicksen
    LAST UPDATED: 4/1/2025
*/
interface NavBarProps {
    selectPage: (value:Page) => void,
    logIn: () => void,
    loggedIn:boolean
}
export function NavBar ({ selectPage, logIn, loggedIn }:NavBarProps) : React.JSX.Element{
    return (
        <div>
            <div className="navbar">
                {/*MAIN NAVBAR CODE*/}
                <div className="nav-button">
                    <img src="https://imgur.com/jPdH44f.png" alt = "pingas" className = "test-image"/>
                    <Button className="button-style" onClick={()=>{
                        selectPage("Home");
                    }}>Home</Button>
                    { loggedIn && 
                        <Button className="button-style" onClick={()=>{
                            selectPage("Results");
                        }}>Results</Button> // Results page is only accessible to logged in users
                    } 
                    <Button className="button-style" id="rightallign" onClick={logIn}>{loggedIn ? "Hello there!" : "Log In / Sign Up"}</Button>
                </div>
                {/*^ Buttons ^*/}
            </div>
        </div>
    )
}