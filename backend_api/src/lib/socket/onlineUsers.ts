import { getUserSockets } from './usersSockets';

let onlineUsersList: string[] = [];

const getOnlineUsersList = (): string[] => onlineUsersList;

const isUserAlreadyOnline = (userId: string): boolean => onlineUsersList.includes(userId);

const addUserToOnlineUsersList = (userId: string): void => {
    onlineUsersList.push(userId);
};

const removeUserFromOnlineUsersList = (userId: string): void => {
    if (isUserAlreadyOnline(userId)) {
        onlineUsersList = onlineUsersList.filter(id => id !== userId);
    }
};


const tryToSetUserOffline = (userId: string): boolean => {
    if (getUserSockets(userId).length === 0) {
        removeUserFromOnlineUsersList(userId);
        return true;
    }
    return false;
};

export {
    getOnlineUsersList,
    isUserAlreadyOnline,
    addUserToOnlineUsersList,
    removeUserFromOnlineUsersList,
    tryToSetUserOffline
};
