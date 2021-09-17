
export interface IReceivedMessage {
    _id: string;
    conversationId: string;
    from: string;
    content: string;
    time?: string;
    read?: boolean;
    createdAt?: string;
    updatedAt?: string
}

export interface ISentMessage {
    conversationId: string;
    from: string;
    content: string;
}

export interface IMessageFormValues {
    content: string
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
    messages: IReceivedMessage[];
    createdAt: string;
    updatedAt: string;
}
