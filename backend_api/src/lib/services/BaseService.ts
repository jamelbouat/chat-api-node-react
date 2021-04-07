import express from 'express';
import IUser from '../interfaces/IUser';
import ObjectNotRegisteredError from '../errors/ObjectNotRegisteredError';
import IService from '../interfaces/IService';

class BaseService implements IService {
    public model: IUser | any;

    constructor() {
        this.model = null;
    }

    public async registerElement(reqData: IUser): Promise<IUser | any> {
        const Model = this.model;
        const data = new Model({ ...reqData });

        try {
            return await data.save();
        } catch (error) {
            throw new ObjectNotRegisteredError(error.message);
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
