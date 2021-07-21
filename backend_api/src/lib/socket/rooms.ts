
let roomsList: string[] = [];

const getRoomsList = () => roomsList;

const setRoomsList = (rooms: string[]) => roomsList = rooms;

const addToRoomsList = (room: string) => roomsList.push(room);

const isRoomExits = (room: string): boolean => {
    return roomsList.includes(room);
};

const removeFromRoomsList = (room: string) => setRoomsList(roomsList.filter(r => r !== room));

export {
    getRoomsList,
    setRoomsList,
    addToRoomsList,
    isRoomExits,
    removeFromRoomsList
};
