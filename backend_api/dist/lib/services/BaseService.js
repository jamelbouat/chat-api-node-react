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
const ResourceNotRegisteredError_1 = __importDefault(require("../errors/ResourceNotRegisteredError"));
const ResourceNotFoundError_1 = __importDefault(require("../errors/ResourceNotFoundError"));
const ResourceNotUpdatedError_1 = __importDefault(require("../errors/ResourceNotUpdatedError"));
const ResourceNotDeletedError_1 = __importDefault(require("../errors/ResourceNotDeletedError"));
class BaseService {
    constructor(model) {
        this.model = model;
    }
    registerBaseElement(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = this.model;
            const data = new Model(Object.assign({}, reqData));
            try {
                yield data.save();
                return data;
            }
            catch (error) {
                throw new ResourceNotRegisteredError_1.default(error.message);
            }
        });
    }
    getBaseElementById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findOne({ _id });
            }
            catch (error) {
                throw new ResourceNotFoundError_1.default(error.message);
            }
        });
    }
    getBaseElementByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findOne({ email });
            }
            catch (error) {
                throw new ResourceNotFoundError_1.default(error.message);
            }
        });
    }
    updateBaseElement(_id, reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findOneAndUpdate({ _id }, reqData, { new: true, useFindAndModify: false });
            }
            catch (error) {
                throw new ResourceNotUpdatedError_1.default(error.message);
            }
        });
    }
    deleteBaseElement(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.model.deleteOne({ _id });
            }
            catch (error) {
                throw new ResourceNotDeletedError_1.default();
            }
        });
    }
    getAllBaseElements(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.find({ _id: { $ne: _id } });
            }
            catch (error) {
                throw new ResourceNotFoundError_1.default(error.message);
            }
        });
    }
}
exports.default = BaseService;
// const elements = await Model.aggregate(
//     [
//         {
//             '$match': {
//                 '_id': Types.ObjectId(_id),
//             },
//         },
//         {
//             '$addFields': {
//                 'userIds': {
//                     '$map': {
//                         'input': '$userIds',
//                         'as': 'id',
//                         'in': {
//                             '$toObjectId': '$$id'
//                         }
//                     }
//                 }
//             }
//         },
//         {
//             '$lookup': {
//                 'from': 'users',
//                 'localField': 'userIds',
//                 'foreignField': '_id',
//                 'as': 'users'
//             }
//         }
//     ]
// );
