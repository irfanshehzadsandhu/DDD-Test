import "reflect-metadata";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as logger from 'morgan';
import {createServer} from "http";
import helmet from "helmet";

//component
import Profile from "../Routes/Api/V1/Profile/Profile";
import Post from "../Routes/Api/V1/Post/Post";
import User from "../Routes/Api/V1/User/User";

const app = express();

app.use(bodyParser.urlencoded({limit: '50mb', parameterLimit: 100000, extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(helmet());
app.disable('x-powered-by');

//routes
app.use('/api/v1', Profile);
app.use('/api/v1', Post);
app.use('/api/v1', User);

const httpServer = createServer(app);

export default httpServer;