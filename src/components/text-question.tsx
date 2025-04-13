import { Form, Button } from "react-bootstrap";
export function TextQuestion(){
    return (
        <div>
            <Form>
                <Form.Text>
                    This is a Question
                </Form.Text>
                <Form.Control type="textarea"></Form.Control>
                <Button>Submit</Button>
            </Form>
        </div>
    );
}