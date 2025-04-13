import { Form, Button } from "react-bootstrap";
export function ScaledQuestion(){
    let scale = ["1", "2", "3", "4", "5"]
    return (
        <div>
            <Form>
                <Form.Text>
                    This is a Question
                </Form.Text>
                <div>
                    {scale.map((id:string)=>(
                        <Form.Check
                        inline
                        type="radio"
                        label={id}
                        name="group-"
                        id={id}
                        ></Form.Check>
                    )
                    )}
                </div>
                <Button>Submit</Button>
            </Form>
        </div>
    );
}