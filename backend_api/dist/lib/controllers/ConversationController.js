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
const BaseController_1 = __importDefault(require("./BaseController"));
const url_config_1 = require("../../config/url.config");
class ConversationController extends BaseController_1.default {
    constructor({ conversationService, userAuthMiddleware }) {
        super(conversationService);
        this.registerConversation = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield this.registerElement(req, res, next);
        });
        this.getConversation = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield this.getElement(req, res, next);
        });
        this.updateConversation = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            return undefined;
        });
        this.deleteConversation = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield this.deleteElement(req, res, next);
        });
        this.getAllConversations = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield this.getAllElements(req, res, next);
        });
        this.deleteMessage = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.body.conversationId;
                const messageId = req.body.messageId;
                const updatedConversation = yield this.service.deleteMessage(_id, messageId);
                res.status(200).json(Object.assign({}, updatedConversation));
            }
            catch (error) {
                next(error);
            }
        });
        this.service = conversationService;
        this.userAuthMiddleware = userAuthMiddleware;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(url_config_1.POST_CONVERSATION_URL, this.userAuthMiddleware, this.registerConversation);
        this.router.get(url_config_1.GET_CONVERSATION_URL, this.userAuthMiddleware, this.getConversation);
        this.router.post(url_config_1.UPDATE_CONVERSATION_URL, this.userAuthMiddleware, this.updateConversation);
        this.router.delete(url_config_1.DELETE_CONVERSATION_URL, this.userAuthMiddleware, this.deleteConversation);
        this.router.get(url_config_1.ALL_CONVERSATIONS_URL, this.userAuthMiddleware, this.getAllConversations);
        this.router.delete(url_config_1.DELETE_MESSAGE_FROM_CONVERSATION_URL, this.userAuthMiddleware, this.deleteMessage);
    }
}
exports.default = ConversationController;
