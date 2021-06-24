import { Model } from 'mongoose';

import ObjectNotRegisteredError from '../errors/ObjectNotRegisteredError';
import { IService, IRequestDataType, IResponseDataType } from '../interfaces/service';
import { IUser } from '../interfaces/user';
import HttpError from '../errors/commons/HttpError';
import ResourceNotFoundError from '../errors/ResourceNotFoundError';
import ResourceNotUpdatedError from '../errors/ResourceNotUpdatedError';
import ResourceNotDeletedError from '../errors/ResourceNotDeletedError';

class BaseService implements IService {
    public model: Model<IUser> | any;

    public async registerBaseElement(reqData: IRequestDataType): Promise<HttpError | void> {
        const Model = this.model;
        const data = new Model({ ...reqData });

        try {
            await data.save();
        } catch (error) {
            throw new ObjectNotRegisteredError(error.message);
        }
    }

    public async getBaseElementById(_id: string): Promise<IResponseDataType | HttpError> {
        try {
            return await this.model.findOne({ _id });
        } catch (error) {
            throw new ResourceNotFoundError(error.message);
        }
    }

    public async getBaseElementByEmail(email: string): Promise<IResponseDataType | HttpError> {
        try {
            return await this.model.findOne({ email });
        } catch (error) {
            throw new ResourceNotFoundError(error.message);
        }
    }

    public async updateBaseElement(_id: string, reqData: IRequestDataType): Promise<IResponseDataType | HttpError> {
        try {
            return await this.model.findOneAndUpdate({ _id }, reqData, { new: true, useFindAndModify: false });
        } catch (error) {
            throw new ResourceNotUpdatedError(error.message);
        }
    }

    public async deleteBaseElement(_id: string): Promise<void | HttpError> {
        try {
            return await this.model.deleteOne({ _id });
        } catch (error) {
            throw new ResourceNotDeletedError();
        }
    }

    public async getAllBaseElements(): Promise<IResponseDataType[] | HttpError> {
        try {
            return await this.model.find();
        } catch (error) {
            throw new ResourceNotDeletedError();
        }
    }
}

export default BaseService;
