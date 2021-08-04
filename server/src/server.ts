import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import authRouter from './routes/auth';
import postRouter from './routes/posts';
import userRouter from './routes/user';

dotenv.config();

declare module 'express-session' {
  interface SessionData {
    userID: string | undefined;
  }
}

const server = async () => {
  createConnection()
    .then(async connection => {
      const app = express();
      app.use(
        express.json({
          limit: '500mb',
        })
      );
      app.use(cors());
      app.use(morgan('dev'));
      app.use(
        session({
          name: 'sid',
          secret: process.env.salvador_dali as string,
          resave: false,
          saveUninitialized: false,
          cookie: {
            secure: false,
            httpOnly: false,
            sameSite: false,
          },
        })
      );
      app.use('/auth', authRouter);
      app.use('/user', userRouter);
      app.use('/post', postRouter);
      app.get('/', (req, res) => {
        console.log(req.session);
        return res.json({
          message: 'IT WORKS 🚀 hi soma',
        });
      });
      const port = process.env.PORT || 5000;
      app.listen(port, () =>
        console.log(`App is up and running on http://localhost:${port}`)
      );
    })
    .catch(error => console.log('TypeORM connection error: ', error));
};

export default server;
