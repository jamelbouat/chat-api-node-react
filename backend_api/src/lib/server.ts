import express from 'express';

class Server {
    private app: express.Application;

    constructor() {
        this.app = express();
        // this.initializeMiddlewares();
        // this.initializeControllers();
    }

    public listen(): void{
        this.app.listen(process.env.PORT, () => {
            console.log('server running');
        });
        this.app.get('/', (req, res) => {
            res.send('hello');
        });
    }
}

export default Server;
