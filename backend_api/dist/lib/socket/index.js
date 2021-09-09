"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const newConnection_1 = require("./newConnection");
const joinChatRoom_1 = require("./joinChatRoom");
const broadcastMessage_1 = require("./broadcastMessage");
const listenToSocketEvents = () => {
    global.io.on('connection', socket => {
        newConnection_1.newConnection(socket);
        socket.on('join-chat-room', (room, userIds) => {
            joinChatRoom_1.joinChatRoom(socket, room, userIds);
        });
        socket.on('chat-message', (room, message) => {
            broadcastMessage_1.broadcastMessage(socket, room, message);
        });
    });
};
exports.default = listenToSocketEvents;
