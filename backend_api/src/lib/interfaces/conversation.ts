import { Document } from 'mongoose';

interface IConversation extends Document {
    _id: string;
    userIds: string[];
    messageIds: string[];
    createdAt: string;
    updatedAt: string;
}

interface IConversationUser {
    _id: string,
    firstName: string,
    lastName: string
}

interface IConversationWithUsersAndMessagesData {
    _id: string;
    users: IConversationUser[];
    messageIds: string[];
    createdAt: string;
    updatedAt: string;
}

interface IConversationData {
    _id: string;
    userIds: string[];
    messageIds: string[];
    createdAt: string;
    updatedAt: string
}

interface IConversationRegisterData {
    userIds: string[]
}

interface IConversationUpdateData {
    userIds?: string[];
    messageIds?: string[]
}

export {
    IConversationUser,
    IConversation,
    IConversationData,
    IConversationRegisterData,
    IConversationUpdateData,
    IConversationWithUsersAndMessagesData
};
