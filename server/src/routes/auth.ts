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
    const { name, email, password } = req.body;
    registerSchema.validateSync(
      {
        userName: name,
        userEmail: email,
        userPassword: password,
      },
      { abortEarly: false }
    );

    const [userByEmail, userByName] = await Promise.all([
      User.findOne({ email: email }),
      User.findOne({ name: name }),
    ]);

    if (userByEmail || userByName) {
      return res.json('This username or email is taken').status(300);
    } else {
      const hashedPw = await bcrypt.hash(
        password,
        Math.floor(Math.random() * 5) + 10
      );
      const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPw,
      }).save();
      req.session.userID = newUser.id;
      console.log(newUser);
      return res.json(newUser).status(200);
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
    const { email, password } = req.body;
    loginSchema.validateSync(
      {
        userEmail: email,
        userPassword: password,
      },
      { abortEarly: false }
    );

    const user = await User.findOneOrFail({ email: email });
    if (!user) {
      return res.json('user does not exist');
    }
    if (await bcrypt.compare(password, user.password)) {
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
