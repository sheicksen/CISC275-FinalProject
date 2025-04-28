import "./css/home.css"
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Page } from '../custom-types';
import Image  from '../resources/mainimage.png'


interface HomeProps {
    selectPage: (value: Page) => void
}
export function Home({selectPage}: HomeProps): React.JSX.Element {
    return (
        <Container id="home">
            <Row>
                <Col>
                    <div className="image-container">
                        <img src={Image} alt="A sillouette of a man with a white question mark on his chest"></img>
                    </div>
                </Col>
                <Col>
                    <h1> Seeking Answers?</h1>
                    <p>Not sure where you see yourself in the future? You're only one click away from finding out.</p>
                    <Button className="button-style basic-quiz-button" style={{fontSize: "45px", borderWidth: "0.6vh"}} onClick={()=>{
                        selectPage("Basic Questions");
                    }}>Start Quiz</Button><br/>
                    <div>
                        <p style={{fontSize: "24px", display:"inline"}}>Have some extra time to spend? Try out our &#8203;
                        <button className="link-button" onClick={()=>{
                            selectPage("Detailed Questions");
                        }}>Detailed Quiz</button>.</p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
