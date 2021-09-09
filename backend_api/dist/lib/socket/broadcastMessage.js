"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastMessage = void 0;
const broadcastMessage = (socket, room, message) => {
    socket.to(room).emit('chat-message', message);
};
exports.broadcastMessage = broadcastMessage;
