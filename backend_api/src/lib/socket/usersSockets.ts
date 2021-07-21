import { Socket } from 'socket.io';

interface IUsersSocketsList {
    [key: string]: Socket
}

const usersSocketsList: IUsersSocketsList = {};

const getUsersSocketsList = (): IUsersSocketsList  => {
    return usersSocketsList;
};

const getUserSocket = (userId: string): Socket => {
    return usersSocketsList[userId];
};

const addToSocketUsersList = (userId: string, socket: Socket): void => {
    usersSocketsList[userId] = socket;
};

export {
    getUsersSocketsList,
    getUserSocket,
    addToSocketUsersList
};
