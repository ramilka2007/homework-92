import React, {useEffect, useRef, useState} from 'react';
import {useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../../features/users/usersSlice.ts";
import {Button, Grid, TextField, Typography} from "@mui/material";
import Message from "../../components/Message/Message.tsx";
import {useNavigate} from "react-router-dom";
import {IncomingMessage} from "../../types.ts";

const Home = () => {
    const ws = useRef<WebSocket | null>(null);
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);

    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [onlineUsers, setOnlineUsers] = useState([]);

    const reconnect = () => {
        ws.current = new WebSocket('ws://localhost:8000/chat');

        ws.current.onclose = () => setTimeout(() => {
            reconnect();
        }, 1000);

        ws.current.onmessage = (event) => {
            const decodedMessage = JSON.parse(event.data) as IncomingMessage;

            if (decodedMessage.type === 'ENTERED') {
                setMessages(decodedMessage.payload);

                if (ws.current) {
                    ws.current.send(
                        JSON.stringify({
                            type: 'ADD_USER',
                            id: user?._id,
                            displayName: user?.displayName,
                        })
                    );
                }
            } else if (decodedMessage.type === 'SET_ONLINE_USERS') {
                setOnlineUsers(decodedMessage.payload);
            } else if (decodedMessage.type === 'NEW_MESSAGE') {
                setMessages((prevState) => [...prevState, decodedMessage.payload]);
            }
        }
        return () => {
            ws.current?.close();
        };
    }

    useEffect(() => {
        if (!user) {
            navigate('/register')
        } else {
            reconnect();
        }
    }, [user, navigate]);

    const sendMessage = (event: React.FormEvent) => {
        event.preventDefault();
        if (!ws.current) {
            return;
        }

        if (user) {
            ws.current?.send(
                JSON.stringify({
                    type: 'NEW_MESSAGE',
                    payload: {
                        user: user._id,
                        message: messageText,
                    },
                })
            );

            setMessageText('');
        }
    };
    return (
        <Grid container justifyContent='center' sx={{flexWrap: 'nowrap'}}>
            <div className='online'>
                <Typography variant='h4'>Online users</Typography>
                {onlineUsers.map((user, idx) => (
                    <p key={user + idx}>{user.displayName}</p>
                ))}
            </div>
            <div className='chat-block'>
                <div className='chat'>
                    <Typography variant='h4'>Chat room</Typography>
                </div>
                <div className='messages' style={{ height: '700px', overflow: 'auto' }}>
                    {
                        messages.map(msg => (
                            <Message
                                key={msg._id + msg.username}
                                role={user.role}
                                user={msg.user.displayName}
                                message={msg.message}
                            />
                        ))
                    }
                </div>
                <form onSubmit={sendMessage}>
                    <Grid container alignItems='center'>
                        <TextField
                            fullWidth={false}
                            label='Message'
                            style={{marginRight: '20px'}}
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                        />
                        <Button variant='contained' size='large' type='submit'>Send</Button>
                    </Grid>
                </form>
            </div>
        </Grid>
    );
};

export default Home;