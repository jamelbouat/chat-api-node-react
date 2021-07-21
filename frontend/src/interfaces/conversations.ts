
export interface IMessage {
    from: string;
    content: string;
    time: string;
    read: boolean
}

export interface IConversation {
    _id: string;
    userIds: string[];
    messages: IMessage[];
    createdAt: string;
    updatedAt: string
}
