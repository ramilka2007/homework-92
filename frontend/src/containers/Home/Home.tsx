import React, {useRef, useState} from 'react';
import {useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../../features/users/usersSlice.ts";
import {Button, Grid, TextField, Typography} from "@mui/material";
import Message from "../../components/Message/Message.tsx";

const Home = () => {
    const ws = useRef(null);
    const user = useAppSelector(selectUser);

    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [onlineUsers, setOnlineUsers] = useState([]);

    const messagesEndRef = useRef(null);

    const sendMessage = e => {
        e.preventDefault();

        ws.current.send(JSON.stringify({
            type: 'CREATE_MESSAGE',
            data: {
                author: user.token,
                message: messageText
            }
        }));

        setMessageText('');
    };
    return (
        <Grid container justifyContent='center' sx={{flexWrap: 'nowrap'}}>
            <div className='online'>
                <Typography variant='h4'>Online users</Typography>
                {onlineUsers.map((user, idx) => (
                    <p key={user + idx}>{user.user}</p>
                ))}
            </div>
            <div className='chat-block'>
                <div className='chat'>
                    <Typography variant='h4'>Chat room</Typography>
                </div>
                <div className='messages'>
                    {
                        messages.map(msg => (
                            <Message
                                key={msg._id + msg.author.username}
                                role={user.role}
                                user={msg.author.username}
                                message={msg.message}
                            />
                        ))
                    }
                    <div ref={messagesEndRef}/>
                </div>
                <form onSubmit={sendMessage}>
                    <Grid container alignItems='center'>
                        <TextField
                            fullWidth={false}
                            label='Message'
                            sx={{marginX: '20px'}}
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