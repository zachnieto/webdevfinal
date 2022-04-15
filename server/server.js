import express from 'express';
import session from 'express-session';
import cors from 'cors';
import sessionController from "./controllers/session.js";
import pingController from "./controllers/ping-controller.js";
import igdbController from './controllers/igdb-controller.js';
import env from 'custom-env'

const app = express();
env.env('dev')
app.use(cors(/*{
    credentials: true,
    origin: process.env.REACT_APP
}*/));
app.use(express.json());

let sess = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 1000 * 60 * 60 * 48,
        sameSite: 'none'
    }
};

if (process.env.APP_ENV === 'dev') {
    sess.cookie.secure = false;
} else {
    app.set('trust proxy', 1)
    app.use(session(sess));
}

pingController(app)
sessionController(app)
igdbController(app)

app.listen(process.env.PORT || 4000);