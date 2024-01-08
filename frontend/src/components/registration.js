import React from "react";
import {Row, Col, Form, Input, Button} from "antd"


export function Registration(props) {
    const{ setUsername, setEnteredUsername } = props
    return (
        <>
            <Form>
                <Row>
                    <Col> Enter Username:</Col>
                </Row>
                <Row>
                    <Col>
                        <Input type="text" name="name" onChange={e => setUsername(e.target.value)} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={e => setEnteredUsername(1)}>Submit</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}