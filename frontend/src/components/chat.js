import React, { useEffect, useState, useRef } from 'react'
import io from "socket.io-client";
import { Row } from "antd"
import { Registration } from './registration';
import { Users } from './users';
import { Chatbox } from './chatbox';


const ENDPOINT = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8000/';

export function Chat() {
    const [username, setUsername] = useState("");
    const [enteredUsername, setEnteredUsername] = useState(0);
    const [id, setId] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);
    const [sentiment, setSentiment] = useState(0.5);
    const socketRef = useRef();

    function sendMessage(event) {
        event.preventDefault();
        const messageObject = {
            body: message,
            id: id,
            username: username
        };
        setMessage("");
        socketRef.current.emit("send message", messageObject)
    }

    useEffect(() => {
        socketRef.current = io.connect(ENDPOINT, { transports: ['websocket'] });
        socketRef.current.on('your id', id => {
            setId(id);
        });
        socketRef.current.on('message', (message) => {
            setMessages(oldMessages => [...oldMessages, message]);
        });
        socketRef.current.on('get users', (users) => {
            setUsers(users);
        });
        socketRef.current.on('get sentiment', (sentiment) => {
            setSentiment(sentiment);
        });
    }, []);

    useEffect(() => {
        if (enteredUsername) {
            socketRef.current.emit('new user', { Username: username });
        }
    }, [enteredUsername, username]);

    return (
        <div>
            {
                enteredUsername ?
                    <>
                        <h3>Welcome, {username}!</h3>
                        <Row>
                            <Users users={users}/>
                        </Row>
                        <Row>
                            Sentiment: {sentiment}
                        </Row>
                        <Chatbox sendMessage={sendMessage} messages={messages} setMessage={setMessage}/>
                    </>
                    :
                    <Registration setUsername={setUsername} setEnteredUsername={setEnteredUsername}/>
            }
        </div>
    )
}