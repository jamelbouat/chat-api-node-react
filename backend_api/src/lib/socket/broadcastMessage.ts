import { Socket } from 'socket.io';

import { IMessageData, IMessageRegisterData } from '../interfaces/message';
import { IConversationService, IMessageService } from '../interfaces/services';

export const broadcastMessage = async (
    socket: Socket,
    room: string,
    message: IMessageRegisterData,
    conversationService: IConversationService,
    messageService: IMessageService) =>
{
    const savedMessage = await messageService.registerElement(message) as IMessageData;
    const messageId = savedMessage._id.toString();
    await conversationService.addNewMessages(room,[ messageId ]);
    global.io.to(room).emit('chat-message', savedMessage);
};
