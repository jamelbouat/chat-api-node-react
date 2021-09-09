import { model, Schema } from 'mongoose';

import { IConversation } from '../interfaces/conversation';

const conversationSchema: Schema = new Schema({
    userIds: [{
        type: String,
        required: true
    }],
    messageIds: [{
        type: String,
        required: true
    }]
},{ timestamps: true }
);

const ConversationModel = model<IConversation>('Conversation', conversationSchema);

export default ConversationModel;
