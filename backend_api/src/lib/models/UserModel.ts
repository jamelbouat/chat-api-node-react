import { model, Schema } from 'mongoose';
import IUser from '../interfaces/IUser';

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },

},{ timestamps: true }
);

const UserModel = model<IUser>('User', userSchema);

export default UserModel;
