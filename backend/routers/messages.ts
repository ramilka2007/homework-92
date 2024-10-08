import express from 'express';
import mongoose from 'mongoose';
import Message from "../models/Message";
import {MessageApi} from "../types";

const messagesRouter = express.Router();

messagesRouter.post('/', async (req, res, next) => {
    try {
        const message = new Message({
            user: req.body.user,
            message: req.body.message,
            datetime: new Date().toISOString(),
        })

        const saveMessage = new Message(message);
        await saveMessage.save();

        return res.send(saveMessage);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }

        return next(e);
    }
});

messagesRouter.get('/', async (req, res, next) => {
    try {
        const messages: MessageApi[] = await Message.find().populate('user', 'displayName');
        if (messages.length > 30) {
            const trimmedArray = messages.slice(messages.length);
            return res.send(trimmedArray);
        }

        return res.send(messages);
    } catch (e) {
        return next(e);
    }
});

export default messagesRouter;