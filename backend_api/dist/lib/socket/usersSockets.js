"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToSocketUsersList = exports.getUserSocket = exports.getUsersSocketsList = void 0;
const usersSocketsList = {};
const getUsersSocketsList = () => {
    return usersSocketsList;
};
exports.getUsersSocketsList = getUsersSocketsList;
const getUserSocket = (userId) => {
    return usersSocketsList[userId];
};
exports.getUserSocket = getUserSocket;
const addToSocketUsersList = (userId, socket) => {
    usersSocketsList[userId] = socket;
};
exports.addToSocketUsersList = addToSocketUsersList;
