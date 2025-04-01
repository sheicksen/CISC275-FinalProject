import {Button} from "react-bootstrap";
import { Page } from '../custom-types';
import { useState } from "react";

/*
    DESCRIPTION: Basic Navbar code
    CREATED BY: Leif Keane
    CREATED DATE: 3/20/2025
    UPDATED BY: N/A
    LAST UPDATED: 3/20/2025
*/
interface NavBarProps {
    selectPage: (value:Page) => void
}
export function NavBar ({ selectPage }:NavBarProps) : React.JSX.Element{
    return (
        <div>
            <div className="navbar">
                {/*MAIN NAVBAR CODE*/}
                <div className="nav-button">
                    <img src="https://imgur.com/jPdH44f.png" alt = "pingas" className = "test-image"/>
                    <Button className="button-style" onClick={()=>{
                        selectPage("Home");
                    }}>Home</Button>
                    <Button className="button-style" onClick={()=>{
                        selectPage("Results");
                    }}>Results</Button>
                    <Button className="button-style" id="rightallign">Login/Signup</Button>
                </div>
                {/*^ Buttons ^*/}
            </div>
        </div>
    )
}