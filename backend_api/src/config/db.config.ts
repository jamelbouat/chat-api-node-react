import mongoose from 'mongoose';
import Constants from '../lib/constants/constants';

class DBClient {

    public makeDatabaseConnection = async (): Promise<void> => {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
        const mongoose_uri = `mongodb+srv://${ MONGO_USER }:${ MONGO_PASSWORD }@${ MONGO_PATH }`;

        try {
            await mongoose.connect(mongoose_uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
            console.log(Constants.DB_CONNECTION_SUCCESS);
        } catch (err) {
            console.log(Constants.DB_CONNECTION_FAILURE);
        }
    };
}

export default DBClient;
