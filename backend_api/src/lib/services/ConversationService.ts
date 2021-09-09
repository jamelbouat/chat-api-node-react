import { Model, Types } from 'mongoose';

import {
    IConversation,
    IConversationData,
    IConversationRegisterData,
    IConversationUpdateData, IConversationWithUsersAndMessagesData,
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
import { getConversationsAggregatePipeline } from '../utils/conversation';

class ConversationService extends BaseService implements IConversationService {

    constructor({ conversationModel }: { conversationModel: Model<IConversation> }) {
        super(conversationModel);
    }

    public async registerElement(reqData: IConversationRegisterData): Promise<IConversationWithUsersAndMessagesData | HttpError> {
        const { error } = conversationRegisterDataValidation(reqData);
        if (error) {
            throw new ResourceNotRegisteredError(error.details[0].message);
        }

        const possibleConversationOccurrence = await this.model.find({
            userIds:  {
                $all: [ ...reqData.userIds ],
                $size: reqData.userIds.length
            }
        });
        if (possibleConversationOccurrence.length > 0) {
            return await this.getElement(possibleConversationOccurrence[0]._id);
        }

        const conversation = await this.registerBaseElement(reqData) as IConversation;
        if (!conversation) {
            throw new ResourceNotRegisteredError('Conversation not created');
        }
        return await this.getElement(conversation._id);
    }

    public async getElement(_id: string): Promise<IConversationWithUsersAndMessagesData | HttpError> {
        const Model = this.model;
        const _idToSearch = Types.ObjectId(_id);
        const conversationsPipeline = getConversationsAggregatePipeline();
        const conversationPipeline = [{
            $match: {
                '_id': _idToSearch,
            }
        }, ...conversationsPipeline];

        try {
            const conversations = await Model.aggregate(conversationPipeline);
            return conversations[0];
        } catch (error) {
            throw new ResourceNotFoundError(error.message);
        }
    }

    public deleteElement(_id: string): Promise<void | HttpError> {
        return Promise.resolve(undefined);
    }

    public async getAllElements(currentUserId: string): Promise<IConversationWithUsersAndMessagesData[] | HttpError> {
        const Model = this.model;
        const conversationsPipeline = getConversationsAggregatePipeline();
        const currentUserConversationsPipeline = [{
            $match: {
                'userIds': { $elemMatch: { $eq: currentUserId } },
            }
        }, ...conversationsPipeline];

        try {
            return await Model.aggregate(currentUserConversationsPipeline);
        } catch (error) {
            throw new ResourceNotFoundError(error.message);
        }
    }

    public async updateElement(_id: string, reqData: IConversationUpdateData): Promise<IConversationData | HttpError> {
        const { error } = conversationUpdateDataValidation(reqData);
        if (error) {
            throw new ResourceNotUpdatedError(error.details[0].message);
        }

        const updatedConversation = await this.updateBaseElement(_id, reqData) as IConversationData;
        return { ...updatedConversation };
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

    public async addNewMessages(_id: string, messageIds: string[]): Promise<IConversationData | HttpError> {
        const conversation = await this.getBaseElementById(_id) as IConversation;
        const _messageIds = conversation.messageIds;
        const updatedMessageIds = [ ..._messageIds, ...messageIds];
        return await this.updateElement(_id, { messageIds: updatedMessageIds });
    }

    public async deleteMessages(_id: string, messageIds: string[]): Promise<IConversationData | HttpError> {
        const conversation = await this.getBaseElementById(_id) as IConversation;
        const _messageIds = conversation.messageIds;
        const updatedUserIds = _messageIds.filter(_messageId => !messageIds.includes(_messageId));
        return await this.updateElement(_id, { userIds: updatedUserIds });
    }
}

export default ConversationService;

// import { Model } from 'mongoose';
//
// import {
//     IConversation,
//     IConversationData,
//     IConversationRegisterData,
//     IConversationUpdateData,
//     IConversationUser,
//     IMessage
// } from '../interfaces/conversation';
// import { IConversationService, IUserService } from '../interfaces/services';
// import BaseService from './BaseService';
// import HttpError from '../errors/commons/HttpError';
// import ResourceNotRegisteredError from '../errors/ResourceNotRegisteredError';
// import {
//     conversationRegisterDataValidation,
//     conversationUpdateDataValidation
// } from '../validations/conversationDataValidation';
// import ResourceNotFoundError from '../errors/ResourceNotFoundError';
// import ResourceNotUpdatedError from '../errors/ResourceNotUpdatedError';
// import { IUser } from '../interfaces/user';
//
// class ConversationService extends BaseService implements IConversationService {
//     private userService: IUserService;
//
//     constructor({ conversationModel, userService }: { conversationModel: Model<IConversation>, userService: IUserService }) {
//         super(conversationModel);
//         this.userService = userService;
//     }
//
//     public async registerElement(reqData: IConversationRegisterData): Promise<IConversationData | HttpError> {
//         const { error } = conversationRegisterDataValidation(reqData);
//         if (error) {
//             throw new ResourceNotRegisteredError(error.details[0].message);
//         }
//
//         const possibleConversationOccurrence = await this.model.find({
//             'users["userId"]': {
//                 $all: [ ...reqData.userIds ],
//                 $in: [...reqData.userIds],
//                 $size: reqData.userIds.length
//             }
//         });
//         // $all: { userId: [ ...reqData.userIds ] }
//
//         if (possibleConversationOccurrence.length > 0) {
//             return possibleConversationOccurrence[0];
//         }
//         const conversationWithInjectedUserNames = await this.addNamesToConversationUsers(reqData.userIds);
//         const conversation = await this.registerBaseElement({ users: conversationWithInjectedUserNames }) as IConversation;
//         if (!conversation) {
//             throw new ResourceNotRegisteredError('Conversation not created');
//         }
//         return conversation;
//     }
//
//     private addNamesToConversationUsers(usersIds: string[]): Promise<IConversationUser[]> {
//         return Promise.all(usersIds.map(async userId => {
//             const user = await this.userService.getElementWithSensitiveData(userId) as IUser;
//             if (!user) {
//                 throw new ResourceNotFoundError(`User with Id ${ userId } does not exist`);
//             }
//             return { userId: user._id, firstName: user.firstName, lastName: user.lastName };
//         }));
//     }
//
//     public async getElement(_id: string): Promise<IConversationData | HttpError> {
//         const conversation = await this.getBaseElementById(_id) as IConversation;
//         if (!conversation) {
//             throw new ResourceNotFoundError('Conversation does not exist');
//         }
//         return conversation;
//     }
//
//     deleteElement(_id: string): Promise<void | HttpError> {
//         return Promise.resolve(undefined);
//     }
//
//     public async getAllElements(): Promise<IConversationData[] | HttpError> {
//         const conversations = await this.getAllBaseElements() as IConversationData[];
//         if (!conversations) {
//             throw new ResourceNotFoundError('Conversations list is empty');
//         }
//         return conversations;
//     }
//
//     public async updateElement(_id: string, reqData: IConversationUpdateData): Promise<IConversationData | HttpError> {
//         const { error } = conversationUpdateDataValidation(reqData);
//         if (error) {
//             throw new ResourceNotUpdatedError(error.details[0].message);
//         }
//
//         const updatedConversation = await this.updateBaseElement(_id, reqData) as IConversationData;
//         return { ...updatedConversation };
//     }
//
//     public async addNewMessage(_id: string, message: IMessage): Promise<IConversationData | HttpError> {
//         const conversation = await this.getBaseElementById(_id) as IConversation;
//         const messages = conversation.messages;
//         const updatedMessages = [ ...messages, message];
//         return await this.updateElement(_id, { messages: updatedMessages });
//     }
//
//     public async deleteMessage(_id: string, messageId: string): Promise<IConversationData | HttpError> {
//         const conversation = await this.getBaseElementById(_id) as IConversation;
//         const messages = conversation.messages;
//         const updatedMessages = messages.filter(message => message._id !== messageId);
//         return await this.updateElement(_id, { messages: updatedMessages });
//     }
//
//     public async addNewUsers(_id: string, userIds: string[]): Promise<IConversationData | HttpError> {
//         const conversationWithInjectedUserNames = await this.addNamesToConversationUsers(userIds);
//         const conversation = await this.getBaseElementById(_id) as IConversation;
//         const users = conversation.users;
//         const updatedConversationUsers = [ ...users, ...conversationWithInjectedUserNames];
//         return await this.updateElement(_id, { users: updatedConversationUsers });
//     }
//
//     public async deleteUsers(_id: string, userIds: string[]): Promise<IConversationData | HttpError> {
//         const conversation = await this.getBaseElementById(_id) as IConversation;
//         const users = conversation.users;
//         const updatedConversationUsers = users.filter(user => !userIds.includes(user.userId));
//         return await this.updateElement(_id, { users: updatedConversationUsers });
//     }
// }
//
// export default ConversationService;
