import { model, Schema } from 'mongoose';

import { IConversation } from '../interfaces/conversation';

const conversationSchema: Schema = new Schema({
    userIds: [{
        type: String,
        required: true
    }],
    messages: [{
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
            required: true
        },
        read: {
            type: Boolean,
            required: true
        }
    }]
},{ timestamps: true }
);

const ConversationModel = model<IConversation>('Conversation', conversationSchema);

export default ConversationModel;
