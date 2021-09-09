"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinChatRoom = void 0;
const usersSockets_1 = require("./usersSockets");
const rooms_1 = require("./rooms");
const joinChatRoom = (socket, room, userIds) => {
    if (rooms_1.isRoomExits(room)) {
        return;
    }
    socket.join(room);
    userIds.forEach(userId => usersSockets_1.getUserSocket(userId).join(room));
    rooms_1.addToRoomsList(room);
};
exports.joinChatRoom = joinChatRoom;
