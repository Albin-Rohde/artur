import { Router } from 'express';
import {User} from "../entity/User";
import bcrypt from "bcryptjs";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const {user_name, user_email, user_password} = req.body;
  const userByEmail = await User.findOne({user_email})
  const userByName =  await User.findOne({user_name})
  if (userByEmail||userByName){
    return res.json("This username or email is taken")
  } else {
    const hashedPw = await bcrypt.hash(user_password, Math.floor(Math.random() * 5) + 10);
    const newUser = await User.create({
      user_name,
      user_email,
      user_password: hashedPw,
    }).save();
    req.session.userID = newUser.user_id;
    console.log(req.session);
    return res.sendStatus(200);
  }
})

authRouter.post("/login", async (req, res) => {
  const {user_email, user_password} = req.body;
  const user = await User.findOneOrFail({user_email})
  if (!user) {
    return res.json('user does not exist');
  }
  if (await bcrypt.compare(user_password, user.user_password)){
    req.session.userID = user.user_id;
    return res.json(user);
  } else {
    return res.sendStatus(401);
  }
});


authRouter.post('/logout', async (req, res) => {
  console.log(req.session);
  req.session.userID = undefined;
  return res.sendStatus(200);
})

export default authRouter;
