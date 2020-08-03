import express from 'express';

import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import { localMiddleware } from './middleware';
import routes from './routes';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import globalRouter from './routers/globalRouter';

import './db';
import './passport';

const app = express();
const CookieStore = MongoStore(session);
const check = (req, res, next) => {
  console.log('check:', req.user);
  next();
};

// helmet은 application을 보다 더 안전하게 만들어준다.
app.use(helmet());

app.set('view engine', 'pug');

app.use('/uploads', express.static('uploads'));

// app을 이용해서 middleware를 추가해준다.
// cookieParser는 사용자 인증에 필요한 cookie를 전달 받는다.
app.use(cookieParser());

// bodyParser는 사용자가 웹사이트로 전달하는 정보들(request 정보에서)
// form이나 JSON 형태로 된 body를 검사한다.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// logging middleware
app.use(morgan('dev'));

app.use(
  session({
    secret: process.env.COOKIE_SECRET, // 무작위 문자열로서 쿠키에 들어있는 sessionID를 암호화 하기 위한 것이다.
    resave: true, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);

// express-session을 설치해주자.
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // connect session

// app.use(check);

app.use(localMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
