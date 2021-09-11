
export interface IMessage {
    _id: string;
    conversationId: string;
    from: string;
    content: string;
    time?: string;
    read?: boolean;
    createdAt?: string;
    updatedAt?: string
}

export interface ISendMessage {
    conversationId: string;
    from: string;
    content: string;
}

export interface IConversationUser {
    _id: string;
    firstName: string;
    lastName: string
}

export interface IConversationUserWithStatus {
    _id: string;
    firstName: string;
    lastName: string;
    online: boolean
}

export interface IConversation {
    _id: string;
    users: IConversationUser[];
    messages: IMessage[];
    createdAt: string;
    updatedAt: string;
}
