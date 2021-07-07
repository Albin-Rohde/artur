import bcrypt from 'bcryptjs';
import { Router } from 'express';
import * as yup from 'yup';
import { User } from '../entity/User';

const authRouter = Router();

const registerSchema = yup.object().shape({
  userName: yup
    .string()
    .min(4)
    .max(25),
  userEmail: yup
    .string()
    .email()
    .max(255),
  userPassword: yup
    .string()
    .min(6)
    .max(255),
});

const loginSchema = yup.object().shape({
  userEmail: yup
    .string()
    .email()
    .max(255),
  userPassword: yup
    .string()
    .min(6)
    .max(255),
});

authRouter.post('/register', async (req, res) => {
  try {
    const { user_name, user_email, user_password } = req.body;
    registerSchema.validateSync(
      {
        userName: user_name,
        userEmail: user_email,
        userPassword: user_password,
      },
      { abortEarly: false },
    );

    const [userByEmail, userByName] = await Promise.all([
      User.findOne({ email: user_email }),
      User.findOne({ name: user_name }),
    ]);


    if (userByEmail || userByName) {
      return res.json('This username or email is taken');
    } else {
      const hashedPw = await bcrypt.hash(
        user_password,
        Math.floor(Math.random() * 5) + 10,
      );
      const newUser = await User.create({
        name: user_name,
        email: user_email,
        password: hashedPw,
      }).save();
      req.session.userID = newUser.id;
      console.log(req.session);
      return res.sendStatus(200);
    }
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.json(error.errors).status(400);
    }
    return res.status(500);
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    loginSchema.validateSync(
      {
        userEmail: user_email,
        userPassword: user_password,
      },
      { abortEarly: false },
    );

    const user = await User.findOneOrFail({ email: user_email });
    if (!user) {
      return res.json('user does not exist');
    }
    if (await bcrypt.compare(user_password, user.password)) {
      req.session.userID = user.id;
      return res.json(user);
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.json(error.errors).status(400);
    }
    return res.status(500);
  }
});

authRouter.post('/logout', async (req, res) => {
  console.log(req.session);
  req.session.userID = undefined;
  return res.sendStatus(200);
});

export default authRouter;
