
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.serverExpress = require('http').createServer(this.app);
        this.areaPath = '/api/area';
        this.parameterPath = '/api/parameter';
        this.middlewares();
        this.routes();

    }
    middlewares() {
        this.app.use(cors({origin:'*'}));
        this.app.use(express.json());
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    routes() {
         this.app.use(this.areaPath, require('../routes/workAreaRoutes'));
         this.app.use(this.parameterPath, require('../routes/workParameterRoutes'));

    }

    listen() {
        this.serverExpress.listen(process.env.PORT, () => {
        });
    }
}

module.exports = Server;