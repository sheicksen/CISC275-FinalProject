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
                <img 
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpreview.redd.it%2Fjtyrcn3k99j81.png%3Fwidth%3D640%26crop%3Dsmart%26auto%3Dwebp%26s%3D0923b7d4c244e3051f6bbb403a8821273a2ea9b6&f=1&nofb=1&ipt=e3725ed25f7695492aed5b86cececfb865ae8a88b506434991755d31820c3af9&ipo=images"
                alt="temporary logo"
                className ="testimage"
                />
                <Button className="button-style">Home</Button>
                <Button className="button-style">About Us</Button>
                <Button className="button-style">Questions</Button>
                <Button className="button-style">Detailed Questions</Button>
                <Button className="button-style" id="rightallign">Login/Signup</Button>
                </div>
                {/*^ Buttons ^*/}
            </div>
        </div>
    )
}