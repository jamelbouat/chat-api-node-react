import { model, Schema } from 'mongoose';

import { IMessage } from '../interfaces/message';

const messageSchema: Schema = new Schema({
    conversationId: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    time: {
        type: String,
        default: Date.now()
    },
    read: {
        type: Boolean,
        default: false
    }
},{ timestamps: true }
);

const MessageModel = model<IMessage>('Message', messageSchema);

export default MessageModel;
