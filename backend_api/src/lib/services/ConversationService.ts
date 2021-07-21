import { Model } from 'mongoose';

import {
    IConversation,
    IConversationData,
    IConversationRegisterData,
    IConversationUpdateData, IMessage
} from '../interfaces/conversation';
import { IConversationService } from '../interfaces/services';
import BaseService from './BaseService';
import HttpError from '../errors/commons/HttpError';
import ResourceNotRegisteredError from '../errors/ResourceNotRegisteredError';
import {
    conversationRegisterDataValidation,
    conversationUpdateDataValidation
} from '../validations/conversationDataValidation';
import ResourceNotFoundError from '../errors/ResourceNotFoundError';
import ResourceNotUpdatedError from '../errors/ResourceNotUpdatedError';

class ConversationService extends BaseService implements IConversationService {

    constructor({ conversationModel }: { conversationModel: Model<IConversation> }) {
        super(conversationModel);
    }

    public async registerElement(reqData: IConversationRegisterData): Promise<IConversationData | HttpError> {
        const { error } = conversationRegisterDataValidation(reqData);
        if (error) {
            throw new ResourceNotRegisteredError(error.details[0].message);
        }

        const possibleConversationOccurrence = await this.model.find({ userIds:  { $all: [ ...reqData.userIds ] } });
        if (possibleConversationOccurrence.length > 0) {
            return possibleConversationOccurrence[0];
        }

        const conversation = await this.registerBaseElement(reqData) as IConversation;
        if (!conversation) {
            throw new ResourceNotRegisteredError('Conversation not created');
        }
        return conversation;
    }

    public async getElement(_id: string): Promise<IConversationData | HttpError> {
        const conversation = await this.getBaseElementById(_id) as IConversation;
        if (!conversation) {
            throw new ResourceNotFoundError('Conversation does not exist');
        }
        return conversation.toObject();
    }

    deleteElement(_id: string): Promise<void | HttpError> {
        return Promise.resolve(undefined);
    }

    getAllElements(): Promise<IConversationData[] | HttpError> {
        throw new ResourceNotRegisteredError('Just for testing');
    }

    public async updateElement(_id: string, reqData: IConversationUpdateData): Promise<IConversationData | HttpError> {
        const { error } = conversationUpdateDataValidation(reqData);
        if (error) {
            throw new ResourceNotUpdatedError(error.details[0].message);
        }

        const updatedConversation = await this.updateBaseElement(_id, reqData) as IConversationData;
        return { ...updatedConversation };
    }

    public async addNewMessage(_id: string, message: IMessage): Promise<IConversationData | HttpError> {
        const conversation = await this.getBaseElementById(_id) as IConversation;
        const messages = conversation.messages;
        const updatedMessages = [ ...messages, message];
        return await this.updateElement(_id, { messages: updatedMessages });
    }

    public async deleteMessage(_id: string, messageId: string): Promise<IConversationData | HttpError> {
        const conversation = await this.getBaseElementById(_id) as IConversation;
        const messages = conversation.messages;
        const updatedMessages = messages.filter(message => message._id !== messageId);
        return await this.updateElement(_id, { messages: updatedMessages });
    }

    public async addNewUsers(_id: string, userIds: string[]): Promise<IConversationData | HttpError> {
        const conversation = await this.getBaseElementById(_id) as IConversation;
        const _userIds = conversation.userIds;
        const updatedUserIds = [ ..._userIds, ...userIds];
        return await this.updateElement(_id, { userIds: updatedUserIds });
    }

    public async deleteUsers(_id: string, userIds: string[]): Promise<IConversationData | HttpError> {
        const conversation = await this.getBaseElementById(_id) as IConversation;
        const _userIds = conversation.userIds;
        const updatedUserIds = _userIds.filter(_userId => !userIds.includes(_userId));
        return await this.updateElement(_id, { userIds: updatedUserIds });
    }
}

export default ConversationService;
