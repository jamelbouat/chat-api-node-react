import express from 'express';
import IUser from './IUser';
import HttpError from '../errors/HttpError';
import IService from './IService';

interface IUserService extends IService {
    loginUser: (reqData: IUser) => Promise<IUser | any>;
}

export default IUserService;
