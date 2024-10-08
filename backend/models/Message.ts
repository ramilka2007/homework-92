import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    datetime: {
        type: String,
        required: true,
    },
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;