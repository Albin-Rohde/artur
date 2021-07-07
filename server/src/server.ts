import session from 'express-session'
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import authRouter from './routes/auth';
import userRouter from "./routes/user";

declare module 'express-session' {
  interface SessionData {
    userID: string | undefined;
  }
}

const server = async () => {
  createConnection()
    .then(async connection => {
      const app = express();
      app.use(express.json());
      app.use(cors());
      app.use(morgan('dev'));
      app.use(session({
        name: 'sid',
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: false,
          maxAge: 864000,
          httpOnly: false,
          sameSite: false,
        }
      }))
      app.use('/auth', authRouter);
      app.use('/user', userRouter);
      app.get('/', (req, res) => {
        console.log(req.session)
        return res.json({
          message: 'IT WORKS 🚀 hi soma',
        });
      });
      const port = process.env.PORT || 5000;
      app.listen(port, () =>
        console.log(`App is up and running on http://localhost:${port}`),
      );
    })
    .catch(error => console.log('TypeORM connection error: ', error));
};

export default server;
