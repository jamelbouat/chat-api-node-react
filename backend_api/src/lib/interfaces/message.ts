import { Document } from 'mongoose';

interface IMessage extends Document {
    _id: string;
    conversationId: string;
    from: string;
    content: string;
    time: string;
    read: boolean;
    createdAt: string;
    updatedAt: string;
}

interface IMessageData {
    _id: string;
    conversationId: string;
    from: string;
    content: string;
    time: string;
    read: boolean;
    createdAt: string;
    updatedAt: string;
}

interface IMessageRegisterData {
    conversationId: string;
    from: string;
    content: string;
}

interface IMessageUpdateData {
    read: boolean; // reads: [ { userId, read: boolean }] to change later
}

export {
    IMessage,
    IMessageData,
    IMessageRegisterData,
    IMessageUpdateData
};
