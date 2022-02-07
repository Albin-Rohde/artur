import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import { MemoryStore, rateLimit } from 'express-rate-limit';
import session from 'express-session';
import morgan from 'morgan';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import authRouter from './routes/auth';
import { feedRouter } from './routes/feed';
import postRouter from './routes/posts';
import userRouter from './routes/user';

dotenv.config();

declare module 'express-session' {
  interface SessionData {
    userID: string | undefined;
    destroy: (...args: any) => any;
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
      app.disable('x-powered-by');
      app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
      app.use(morgan('dev'));
      app.use(
        session({
          name: 'sid',
          secret: process.env.COOKIE_SECRET as string,
          resave: false,
          saveUninitialized: false,
          cookie: {
            secure: false,
            httpOnly: false,
            sameSite: false,
          },
        })
      );

      app.use(
        rateLimit({
          windowMs: 15 * 60 * 1000, // 15 minutes
          max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
          message:
            'Too many request  from this IP, please try again after some time',
          standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
          legacyHeaders: true, // Enable the `X-RateLimit-*` headers
          store: new MemoryStore(), // Use the memory store
        })
      );
      app.use('/auth', authRouter);
      app.use('/user', userRouter);
      app.use('/posts', postRouter);
      app.use('/feed', feedRouter);
      app.get('/', (req, res) => {
        console.log(req.session);
        return res.json({
          message: 'IT WORKS 🚀 hi soma',
        });
      });
      const port = process.env.SERVER_PORT || 666;
      app.listen(port, () =>
        console.log(`App is up and running on http://localhost:${port}`)
      );
    })
    .catch(error => console.log('TypeORM connection error: ', error));
};

export default server;
