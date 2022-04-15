import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import cors from 'cors';
import sessionController from "./controllers/session.js";
import userController from "./controllers/user-controller.js";
import igdbController from './controllers/igdb-controller.js';
import env from 'custom-env';
const app = express();

env.env('dev')
app.use(cors({
    credentials: true,
    origin: process.env.REACT_APP || "http://localhost:3000"
}));
app.use(express.json());

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/webdev'
mongoose.connect(CONNECTION_STRING);

let sess = {
    secret: "SECRET",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
    }
};

if (process.env.APP_ENV === 'dev') {
    sess.cookie.secure = false;
} else {
    sess.cookie.sameSite = 'none';
}

app.set('trust proxy', 1)
app.use(session(sess));

sessionController(app)
userController(app)
igdbController(app)

app.listen(process.env.PORT || 4000);