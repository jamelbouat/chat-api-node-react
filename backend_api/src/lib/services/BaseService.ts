import express from 'express';
import IUser from '../interfaces/IUser';
import ObjectNotFoundError from '../errors/commons/ObjectNotCreatedError';
import HttpError from '../errors/HttpError';
import IService from '../interfaces/IService';

class BaseService implements IService {
    public model: IUser | any;
    public objectNotCreatedError: HttpError;

    constructor() {
        this.model = null;
        this.objectNotCreatedError = new ObjectNotFoundError();
    }

    public async createElement(reqData: IUser): Promise<express.Response> {
        const Model = this.model;
        const NotCreatedError = this.objectNotCreatedError;

        const data = new Model({ ...reqData });
        try {
            return await data.save();
        } catch (error) {
            throw NotCreatedError;
        }
    }

    public async getElement(req: express.Request, res: express.Response, model: any): Promise<void> {
        return Promise.resolve(undefined);
    }

    public async updateElement(req: express.Request, res: express.Response, model: any): Promise<void> {
        return Promise.resolve(undefined);
    }

    public async deleteElement(req: express.Request, res: express.Response, model: any): Promise<void> {
        return Promise.resolve(undefined);
    }



}

export default BaseService;
