import { Document } from 'mongoose';

interface IUser extends Document {
    _id: string
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export default IUser;
