import { RootState } from '../interfaces/state';
import { Selector } from 'react-redux';

const socketIdSelector: Selector<RootState, string> = (state) => {
    return state.messagesState.socketId;
};

export {
    socketIdSelector
};
