
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.serverExpress = require('http').createServer(this.app);
        this.areaPath = '/api/area';
        this.parameterPath = '/api/parameter';
        this.timePath = '/api/time';
        this.positionPath = '/api/position';
        this.assignmentPath = '/api/assignments';
        this.detailPath = '/api/detail';
        this.authPath = '/api/auth';
        this.userPath = '/api/user';
        this.workDayPath = '/api/workday';
        this.workDayTimeZoneVolume = '/api/volume';
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
         this.app.use(this.timePath, require('../routes/timeZoneRoutes'));
         this.app.use(this.positionPath, require('../routes/workPositionRoutes'));
         this.app.use(this.assignmentPath, require('../routes/assignmentRoutes'));
         this.app.use(this.detailPath, require('../routes/parameterDetailRoutes'));
         this.app.use(this.authPath, require('../routes/authRoutes'));
         this.app.use(this.userPath, require('../routes/userRoutes'));
         this.app.use(this.workDayPath,require('../routes/workDayRoutes'))
         this.app.use(this.workDayTimeZoneVolume,require('../routes/workDayTimeZoneVolumeRoutes'))
    }

    listen() {
        this.serverExpress.listen(process.env.PORT, () => {
        });
    }
}

module.exports = Server;