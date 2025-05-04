import "./css/home.css"
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Page } from '../custom-types';
import Image  from '../resources/CareerHPGraphic.png'


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
                <Col className="desc-container">
                    <h1> Seeking Answers?</h1>
                    <p style={{fontSize: "22px", display:"inline"}}>Knowing what career you want to pursue is difficult. Narrowing down the thousands of possible ways to make money into a single profession, or even a field of study can take lots of research online, discussions with experienced workers, and introspection into your own preferences. While we can’t do all that work for you, our quiz can help you understand what you want from your career, as well as what some careers look like, should you choose to pursue them.</p>
                    <Button className="button-style basic-quiz-button" style={{fontSize: "45px", borderWidth: "0.6vh"}} onClick={()=>{
                        selectPage("Basic Questions");
                    }}>Start Quiz</Button><br/>
                    <div>
                        <p style={{fontSize: "22px", display:"inline"}}>Already know what area you want to work in? Looking for more than just a broad-strokes assessment? Talk to an AI in our &#8203;
                        <button className="link-button" onClick={()=>{
                            selectPage("Detailed Questions");
                        }}>Detailed Quiz</button>.</p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
