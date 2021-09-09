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
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = __importDefault(require("../lib/constants/constants"));
class DBClient {
    constructor() {
        this.makeDatabaseConnection = () => __awaiter(this, void 0, void 0, function* () {
            const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
            const mongoose_uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`;
            try {
                yield mongoose_1.default.connect(mongoose_uri, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true
                });
                console.log(constants_1.default.DB_CONNECTION_SUCCESS);
            }
            catch (err) {
                console.log(constants_1.default.DB_CONNECTION_FAILURE);
            }
        });
    }
}
exports.default = DBClient;
