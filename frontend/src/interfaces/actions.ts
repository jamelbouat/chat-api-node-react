import { Action } from 'redux';

import { ITokens } from './tokens';
import { IUser } from './user';
import { IAlert } from './alert';
import { IConversation, IReceivedMessage } from './conversations';

export interface ILoginAction extends Action {
    payload: { user: IUser } & IAlert
}

export interface IRegisterAction extends Action {
    payload: IAlert
}

export interface IUsersAction extends Action {
    payload: {
        users: IUser[],
        alertMessage: string,
        userIds: string[]
    }
}

export interface IConversationsAction extends Action {
    payload: {
        _id?: string
        conversations?: IConversation[];
        conversation?: IConversation;
        alertMessage?: string;
        message?: IReceivedMessage;
    }
}

export interface IMessagesAction extends Action {
    payload: {
        socketId: string;
        messages: IReceivedMessage[];
        alertMessage: string;
    }
}

export interface ITokenAction extends Action {
    payload: ITokens & { promise: Promise<void> }
}
