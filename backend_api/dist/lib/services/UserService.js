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
const bcrypt_1 = __importDefault(require("bcrypt"));
const BaseService_1 = __importDefault(require("./BaseService"));
const UserNotLoggedError_1 = __importDefault(require("../errors/UserNotLoggedError"));
const ResourceNotUpdatedError_1 = __importDefault(require("../errors/ResourceNotUpdatedError"));
const ResourceNotRegisteredError_1 = __importDefault(require("../errors/ResourceNotRegisteredError"));
const userDataValidation_1 = require("../validations/userDataValidation");
const token_1 = require("../utils/token");
const ResourceNotFoundError_1 = __importDefault(require("../errors/ResourceNotFoundError"));
class UserService extends BaseService_1.default {
    constructor({ userModel }) {
        super(userModel);
    }
    registerElement(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getBaseElementByEmail(reqData.email);
            if (user) {
                throw new ResourceNotRegisteredError_1.default(`Email ${reqData.email} already exists`);
            }
            const { error } = userDataValidation_1.userRegisterDataValidation(reqData);
            if (error) {
                throw new ResourceNotRegisteredError_1.default(error.details[0].message);
            }
            const salt = yield bcrypt_1.default.genSalt();
            reqData.password = yield bcrypt_1.default.hash(reqData.password, salt);
            yield this.registerBaseElement(reqData);
        });
    }
    getElement(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getBaseElementById(_id);
            if (!user) {
                throw new ResourceNotFoundError_1.default('User does not exist');
            }
            const userWithoutSensitiveData = token_1.removeSensitiveDataFromUser(user);
            return Object.assign({}, userWithoutSensitiveData);
        });
    }
    getElementWithSensitiveData(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getBaseElementById(_id);
        });
    }
    updateElement(_id, reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getBaseElementById(_id);
            if (!user) {
                throw new ResourceNotUpdatedError_1.default('User does not exist');
            }
            const { error } = userDataValidation_1.userUpdateDataValidation(reqData);
            if (error) {
                throw new ResourceNotUpdatedError_1.default(error.details[0].message);
            }
            const updatedUser = yield this.updateBaseElement(_id, reqData);
            const userWithoutSensitiveData = token_1.removeSensitiveDataFromUser(updatedUser);
            return Object.assign({}, userWithoutSensitiveData);
        });
    }
    deleteElement(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.deleteBaseElement(_id);
        });
    }
    getAllElements(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.getAllBaseElements(_id);
            if (!users) {
                throw new ResourceNotFoundError_1.default('Users list is empty');
            }
            return users.map((user) => token_1.removeSensitiveDataFromUser(user));
        });
    }
    logoutUser(user, refreshToken) {
        const _super = Object.create(null, {
            updateBaseElement: { get: () => super.updateBaseElement }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const userRefreshTokens = user.refreshTokens || [];
            const updatedUserRefreshTokensArr = userRefreshTokens.filter(token => token !== refreshToken);
            yield _super.updateBaseElement.call(this, user._id, { refreshTokens: updatedUserRefreshTokensArr });
        });
    }
    loginUser(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getBaseElementByEmail(reqData.email);
            if (!user) {
                throw new UserNotLoggedError_1.default(`Email ${reqData.email} does not exist`);
            }
            const { error } = userDataValidation_1.userLoginDataValidation(reqData);
            if (error) {
                throw new UserNotLoggedError_1.default(error.details[0].message);
            }
            const validPassword = yield bcrypt_1.default.compare(reqData.password, user.password);
            if (!validPassword) {
                throw new UserNotLoggedError_1.default('wrong email or password');
            }
            const userWithoutSensitiveData = token_1.removeSensitiveDataFromUser(user);
            const { accessToken, refreshToken } = token_1.generateAccessAndRefreshTokens(user);
            yield this.addRefreshTokenToRefreshTokensArray(user, refreshToken);
            return { user: userWithoutSensitiveData, accessToken, refreshToken };
        });
    }
    addRefreshTokenToRefreshTokensArray(user, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            let userRefreshTokensArr = user.refreshTokens || [];
            if (userRefreshTokensArr.length >= 5) {
                userRefreshTokensArr = [];
            }
            userRefreshTokensArr.push(refreshToken);
            yield this.updateBaseElement(user._id, { refreshTokens: userRefreshTokensArr });
        });
    }
}
exports.default = UserService;
