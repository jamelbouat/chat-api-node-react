import { Document } from 'mongoose';

interface IMessage {
    _id: string;
    from: string;
    content: string;
    time: string;
    read: boolean
}

interface IConversation extends Document {
    _id: string;
    userIds: string[];
    messages: IMessage[];
    createdAt: string;
    updatedAt: string;
}

interface IConversationData {
    _id: string;
    userIds: string[];
    messages: IMessage[];
    createdAt: string;
    updatedAt: string
}

interface IConversationRegisterData {
    userIds: string[]
}

interface IConversationUpdateData {
    userIds?: string[];
    messages?: IMessage[]
}

export { IMessage, IConversation, IConversationData, IConversationRegisterData, IConversationUpdateData };
