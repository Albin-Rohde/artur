import { Router } from 'express';
import {User} from "../entity/User";

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  if (!req.session.userID) {
    return res.json('not authenticated')
  }
  const user = await User.findOne(req.session.userID);
  if (!user) {
    return res.json('not authenticated')
  }
  return res.json(user);
})

export default userRouter;
