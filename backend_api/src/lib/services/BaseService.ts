import { Model } from 'mongoose';

import ResourceNotRegisteredError from '../errors/ResourceNotRegisteredError';
import { IRequestDataType, IResponseDataType, IBaseService } from '../interfaces/services';
import HttpError from '../errors/commons/HttpError';
import ResourceNotFoundError from '../errors/ResourceNotFoundError';
import ResourceNotUpdatedError from '../errors/ResourceNotUpdatedError';
import ResourceNotDeletedError from '../errors/ResourceNotDeletedError';

class BaseService implements IBaseService {
    public model: Model<any>;

    constructor(model: Model<any>) {
        this.model = model;
    }

    public async registerBaseElement(reqData: IRequestDataType): Promise<IResponseDataType | HttpError> {
        const Model = this.model;
        const data = new Model({ ...reqData });

        try {
            await data.save();
            return data;
        } catch (error) {
            throw new ResourceNotRegisteredError(error.message);
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
            await this.model.deleteOne({ _id });
        } catch (error) {
            throw new ResourceNotDeletedError();
        }
    }

    public async getAllBaseElements(): Promise<IResponseDataType[] | HttpError> {
        try {
            return await this.model.find();
        } catch (error) {
            throw new ResourceNotFoundError(error.message);
        }
    }
}

export default BaseService;
