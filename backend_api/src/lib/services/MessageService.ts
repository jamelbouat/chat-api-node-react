import { Model } from 'mongoose';

import BaseService from './BaseService';
import { IMessage, IMessageData, IMessageRegisterData, IMessageUpdateData } from '../interfaces/message';
import { IMessageService } from '../interfaces/services';
import HttpError from '../errors/commons/HttpError';
import InternalServerError from '../errors/InternalServerError';
import { messageRegisterDataValidation } from '../validations/messageDataValidation';
import ResourceNotFoundError from '../errors/ResourceNotFoundError';

class MessageService extends BaseService implements IMessageService {

    constructor({ messageModel }: { messageModel: Model<IMessage>}) {
        super(messageModel);
    }

    public async registerElement(reqData: IMessageRegisterData): Promise<IMessageData | HttpError> {
        const { error } = messageRegisterDataValidation(reqData);
        if (error) {
            console.log(error.details[0].message);
        }
        const message = await this.registerBaseElement(reqData) as IMessageData;
        if (!message) {
            console.log('Message not saved');
        }
        return message;
    }

    public async getElement(_id: string): Promise<IMessageData | HttpError> {
        const message = await this.getBaseElementById(_id) as IMessage;
        if (!message) {
            throw new ResourceNotFoundError('Message not found');
        }
        return message.toObject();
    }

    public updateElement(_id: string, reqData: IMessageUpdateData): Promise<IMessageData | HttpError> {
        return Promise.resolve(new InternalServerError());
    }

    public deleteElement(_id: string): Promise<void | HttpError> {
        return Promise.resolve(undefined);
    }

    public async getAllElements(conversationId: string): Promise<IMessageData[] | HttpError> {
        const messages =  await this.model.find({ conversationId });
        if (!messages) {
            throw new ResourceNotFoundError('Messages list is empty');
        }
        return messages.map(message => message.toObject());
    }
}

export default MessageService;
