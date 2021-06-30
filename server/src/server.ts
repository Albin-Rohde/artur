import session from 'express-session'
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './entity/User';

declare module 'express-session' {
  interface SessionData {
    userID: string;
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
      app.get('/', (req, res) => {
        console.log(req.session)
        return res.json({
          message: 'IT WORKS 🚀 hi soma',
        });
      });

      const port = process.env.PORT || 1234;
      
      app.post("/register", async (req, res) => {
        const {user_name, user_email, user_password} = req.body;
        const userByEmail = await User.findOne({user_email})
        const userByName =  await User.findOne({user_name})
        if (userByEmail||userByName){
          return res.json("This username or email is taken")
        }
        else{
          const newUser = new User();
          newUser.user_name = user_name;
          newUser.user_email = user_email;
          newUser.user_password = user_password;
          await newUser.save();
          res.json("Done Saving New User");
          req.session.userID = newUser.user_id;
          req.session.save();
          console.log(req.session);
        }
      });

      app.post("/login", async (req, res) => {
        const {user_email, user_password} = req.body;
        const user = await User.findOneOrFail({user_email})
        if (user.user_password === user_password){
         
        }
      });

      app.listen(port, () =>
        console.log(`App is up and running on http://localhost:${port}`),
      );
    })
    .catch(error => console.log('TypeORM connection error: ', error));
};

export default server;
