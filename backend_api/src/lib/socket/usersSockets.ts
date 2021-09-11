import { Socket } from 'socket.io';

interface IUsersSocketsList {
    [key: string]: Socket[]
}

const userSocketsList: IUsersSocketsList = {};

const isUserIncludedInSocketsList = (userId: string): boolean => {
    return userSocketsList[userId] !== undefined;
};

const getUserSockets = (userId: string): Socket[] => {
    return userSocketsList[userId];
};

const addSocketToUserSocketsList = (userId: string, socket: Socket): void => {
    isUserIncludedInSocketsList(userId) ?
        userSocketsList[userId].push(socket) :
        userSocketsList[userId] = [socket];
};

const removeSocketFromUserSocketsList = (socketToRemove: Socket): void => {
    const userId = socketToRemove.data.userId;
    userSocketsList[userId] = getUserSockets(userId)?.
        filter(socket => socket.id !== socketToRemove.id);
};

export {
    getUserSockets,
    addSocketToUserSocketsList,
    removeSocketFromUserSocketsList
};
