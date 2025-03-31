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
                    <img src="https://imgur.com/jPdH44f.png" alt = "pingas" className = "test-image"/>
                    <Button className="button-style">Home</Button>
                    <Button className="button-style">Explore</Button>
                    <Button className="button-style" id="rightallign">Login/Signup</Button>
                </div>
                {/*^ Buttons ^*/}
            </div>
        </div>
    )
}