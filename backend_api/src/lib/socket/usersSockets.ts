import { Socket } from 'socket.io';

interface IUsersSocketsList {
    [key: string]: Socket[]
}

const userSocketsList: IUsersSocketsList = {};
const isUserExistsInSocketsList = (userId: string): boolean => {
    return userSocketsList[userId] !== undefined;
};

const getUsersSocketsList = (): IUsersSocketsList  => {
    return userSocketsList;
};

const getUserSockets = (userId: string): Socket[] => {
    return userSocketsList[userId];
};

const addToUserSocketsList = (userId: string, socket: Socket): void => {
    isUserExistsInSocketsList(userId) ?
        userSocketsList[userId].push(socket) :
        userSocketsList[userId] = [socket];
};

const removeFromUserSocketsList = (socketToRemove: Socket): void => {
    const userId = socketToRemove.data.userId;
    userSocketsList[userId] = userSocketsList[userId].filter(socket => socket.id !== socketToRemove.id);
};


export {
    getUsersSocketsList,
    getUserSockets,
    addToUserSocketsList,
    removeFromUserSocketsList
};
