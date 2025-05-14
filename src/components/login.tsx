import "./css/login.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { loadUser, saveUser } from "../functions/storage";
import { Page } from "../custom-types";
import { preventFormSubmitReload } from "../functions/form-submit";

interface LoginProps {
    selectPage: (value: Page) => void
}
export function Login({selectPage}: LoginProps): React.JSX.Element {
    const [usrnm, setUsrnm] = useState<string>("");
    const [failed, setFailed] = useState<"login" | "newusr" | "nousr" | undefined>(undefined);

    function changeUsrnm(event: React.ChangeEvent<HTMLInputElement>) {
        setUsrnm(event.target.value);
        setFailed(undefined);
    }

    return (
        <div id="login">
            <Form onSubmit={(e) => {preventFormSubmitReload(e); alert("Choose Login or Create User")}}>
                <Form.Label>Login:</Form.Label>
                <Form.Control className="align-to-button" placeholder="Username" onChange={changeUsrnm}></Form.Control>
                <Button className="button-style login-button" onClick={() => {
                    if (loadUser(usrnm) && usrnm !== "") {
                        localStorage.setItem("usrnm", usrnm);
                        selectPage("Home");
                    } else {
                        if(usrnm === ""){
                            setFailed("nousr")
                        } else {
                            setFailed("login");
                        }
                    }
                }}>Login</Button>
                <Button className="button-style login-button" onClick={() => {
                    if (!loadUser(usrnm)) {
                        saveUser({name: usrnm, quizzes: []});
                            localStorage.setItem("usrnm", usrnm);
                            selectPage("Home");
                    } else {
                        if(usrnm === ""){
                            setFailed("nousr")
                        } else {
                            setFailed("newusr");
                        }
                    }
                }}>Create User</Button>
            </Form>
            {failed &&
                <div id="login-failure" className="align-to-button">
                    {failed === "login" ?
                        `User "${usrnm}" does not exist.`
                    :   failed === "newusr" ? `User "${usrnm}" already exists.`
                    : 'Please enter a username'
                    }
                </div>
            }
        </div>
    )
}
