import {Button} from "react-bootstrap";

/*
    DESCRIPTION: Basic Navbar code
    CREATED BY: Leif Keane
    CREATED DATE: 3/20/2025
    UPDATED BY: N/A
    LAST UPDATED: 3/20/2025
*/

export function NavBar () : React.JSX.Element{
    return (
        <div>
            <div className="navbar">
                {/*MAIN NAVBAR CODE*/}
                <div className="nav-button">
                <Button className="button-style">Active Button</Button>
                <Button disabled = {true} className="button-style">Inactive Button</Button>
                <Button className="button-style">Questions</Button>
                <Button className="button-style">Detailed Questions</Button>
                <Button className="button-style" id="rightallign">Login/Signup</Button>
                </div>
                {/*^ Buttons ^*/}
            </div>
        </div>
    )
}