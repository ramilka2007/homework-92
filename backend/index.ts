import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';
import mongoose from 'mongoose';
import type {ActiveConnections, MessageApi, UsersOnline} from './types';
import usersRouter from "./routers/users";
import config from "./config";
import Message from "./models/Message";
import {User} from "./models/User";

const app = express();
expressWs(app);
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use('/users', usersRouter);

const router = express.Router();

const activeConnections: ActiveConnections = {};
let usersOnline: UsersOnline[] = [];

router.ws('/chat', async (ws, _req) => {
    const id = crypto.randomUUID();
    activeConnections[id] = ws;
    let username: UsersOnline;
    const messages: MessageApi[] = await Message.find().populate('user', 'displayName');

    ws.send(
        JSON.stringify({
            type: 'ENTERED',
            payload: messages,
        })
    );

    ws.on('message', async (msg) => {
        const decodedMessage = JSON.parse(msg.toString());

        switch (decodedMessage.type) {
            case 'ADD_USER':
                if (decodedMessage.type === 'ADD_USER') {
                    const user = await User.findById({ _id: decodedMessage.id });
                    if (!user) {
                        return ws.close();
                    } else {
                        const newUser = {
                            _id: id,
                            displayName: user.displayName,
                        };

                        usersOnline.push(newUser);
                        username = newUser;

                        Object.values(activeConnections).forEach((connection) => {
                            const response = { type: 'SET_ONLINE_USERS', payload: usersOnline };
                            connection.send(JSON.stringify(response));
                        });
                    }
                }
                break;
            case 'NEW_MESSAGE':
                const message = new Message({
                    user: decodedMessage.payload.user,
                    message: decodedMessage.payload.message,
                    datetime: new Date().toISOString(),
                });

                const saveMessage = new Message(message);
                await saveMessage.save();

                const messageById = await Message.findOne({ _id: saveMessage._id.toString() }).populate('user', 'displayName');

                Object.values(activeConnections).forEach((connection) => {
                    const response = { type: 'SEND_MESSAGE', payload: messageById };
                    connection.send(JSON.stringify(response));
                });
                break;
            default:
                console.log('Unknown message type:', decodedMessage.type);
        }
    });

    ws.on('close', () => {
        console.log('client disconnected! id=', id);
        usersOnline = usersOnline.filter((user) => user !== username);
        Object.values(activeConnections).forEach((connection) => {
            const response = { type: 'SET_ONLINE_USERS', payload: usersOnline };
            connection.send(JSON.stringify(response));
        });

        delete activeConnections[id];
    });
});

app.use(router);

const run = async () => {
    await mongoose.connect(config.database);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);