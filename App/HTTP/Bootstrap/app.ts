import "reflect-metadata";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as logger from 'morgan';
import {createServer} from "http";
import {Server} from "socket.io";

import User from "../Routes/Api/V1/User/User";
import Post from "../Routes/Api/V1/Post/Post";
import Profile from "../Routes/Api/V1/Profile/Profile";

const app = express();

app.use(bodyParser.urlencoded({limit: '50mb', parameterLimit: 100000, extended: true}));
app.use(bodyParser.json());
app.use('/static', express.static(__dirname + '../../../../static'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(logger('dev'));

app.use('/api/v1', User);
app.use('/api/v1', Post);
app.use('/api/v1', Profile);

const httpServer = createServer(app);
const io = new Server(httpServer, {cors: {origin: '*'}});

export {httpServer, io}