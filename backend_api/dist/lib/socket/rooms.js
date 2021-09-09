"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromRoomsList = exports.isRoomExits = exports.addToRoomsList = exports.setRoomsList = exports.getRoomsList = void 0;
let roomsList = [];
const getRoomsList = () => roomsList;
exports.getRoomsList = getRoomsList;
const setRoomsList = (rooms) => roomsList = rooms;
exports.setRoomsList = setRoomsList;
const addToRoomsList = (room) => roomsList.push(room);
exports.addToRoomsList = addToRoomsList;
const isRoomExits = (room) => {
    return roomsList.includes(room);
};
exports.isRoomExits = isRoomExits;
const removeFromRoomsList = (room) => setRoomsList(roomsList.filter(r => r !== room));
exports.removeFromRoomsList = removeFromRoomsList;
