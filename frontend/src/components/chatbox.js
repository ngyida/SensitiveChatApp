import React from "react";
import { List, Input, Row, Button} from "antd"


export function Chatbox(props) {
    const { sendMessage, messages, setMessage } = props

    return (
        <>
            <Row>
                <List
                    header={<div>Chat</div>} 
                    footer={null} 
                    bordered 
                    dataSource={messages} 
                    renderItem={messageObj => ( 
                        <List.Item> 
                            {`${messageObj.username}: ${messageObj.body} (tone: ${messageObj.tone})`}
                        </List.Item> 
                    )} 
                />
            </Row>
            <Row>
                <Input type="text" name="message" placeholder="Enter message here" onChange={e => setMessage(e.target.value)} />
                <Button onClick={e => sendMessage(e)}>Send</Button>
            </Row>
        </>
    )
}