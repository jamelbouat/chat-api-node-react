"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BaseService_1 = __importDefault(require("./BaseService"));
const ResourceNotRegisteredError_1 = __importDefault(require("../errors/ResourceNotRegisteredError"));
const conversationDataValidation_1 = require("../validations/conversationDataValidation");
const ResourceNotFoundError_1 = __importDefault(require("../errors/ResourceNotFoundError"));
const ResourceNotUpdatedError_1 = __importDefault(require("../errors/ResourceNotUpdatedError"));
const conversation_1 = require("../utils/conversation");
class ConversationService extends BaseService_1.default {
    constructor({ conversationModel }) {
        super(conversationModel);
    }
    registerElement(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = conversationDataValidation_1.conversationRegisterDataValidation(reqData);
            if (error) {
                throw new ResourceNotRegisteredError_1.default(error.details[0].message);
            }
            const possibleConversationOccurrence = yield this.model.find({
                userIds: {
                    $all: [...reqData.userIds],
                    $size: reqData.userIds.length
                }
            });
            if (possibleConversationOccurrence.length > 0) {
                return yield this.getElement(possibleConversationOccurrence[0]._id);
            }
            const conversation = yield this.registerBaseElement(reqData);
            if (!conversation) {
                throw new ResourceNotRegisteredError_1.default('Conversation not created');
            }
            return yield this.getElement(conversation._id);
        });
    }
    getElement(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = this.model;
            const _idToSearch = mongoose_1.Types.ObjectId(_id);
            const conversationsPipeline = conversation_1.getConversationsAggregatePipeline();
            const conversationPipeline = [{
                    '$match': {
                        '_id': _idToSearch,
                    }
                }, ...conversationsPipeline];
            try {
                const conversations = yield Model.aggregate(conversationPipeline);
                return conversations[0];
            }
            catch (error) {
                throw new ResourceNotFoundError_1.default(error.message);
            }
        });
    }
    deleteElement(_id) {
        return Promise.resolve(undefined);
    }
    getAllElements() {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = this.model;
            const conversationsPipeline = conversation_1.getConversationsAggregatePipeline();
            try {
                return yield Model.aggregate([...conversationsPipeline]);
            }
            catch (error) {
                throw new ResourceNotFoundError_1.default(error.message);
            }
        });
    }
    updateElement(_id, reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = conversationDataValidation_1.conversationUpdateDataValidation(reqData);
            if (error) {
                throw new ResourceNotUpdatedError_1.default(error.details[0].message);
            }
            const updatedConversation = yield this.updateBaseElement(_id, reqData);
            return Object.assign({}, updatedConversation);
        });
    }
    addNewMessage(_id, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversation = yield this.getBaseElementById(_id);
            const messages = conversation.messages;
            const updatedMessages = [...messages, message];
            return yield this.updateElement(_id, { messages: updatedMessages });
        });
    }
    deleteMessage(_id, messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversation = yield this.getBaseElementById(_id);
            const messages = conversation.messages;
            const updatedMessages = messages.filter(message => message._id !== messageId);
            return yield this.updateElement(_id, { messages: updatedMessages });
        });
    }
    addNewUsers(_id, userIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversation = yield this.getBaseElementById(_id);
            const _userIds = conversation.userIds;
            const updatedUserIds = [..._userIds, ...userIds];
            return yield this.updateElement(_id, { userIds: updatedUserIds });
        });
    }
    deleteUsers(_id, userIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversation = yield this.getBaseElementById(_id);
            const _userIds = conversation.userIds;
            const updatedUserIds = _userIds.filter(_userId => !userIds.includes(_userId));
            return yield this.updateElement(_id, { userIds: updatedUserIds });
        });
    }
}
exports.default = ConversationService;
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
