import { Router } from 'express';
import { User } from '../entity/User';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  if (!req.session.userID) {
    return res.json('not authenticated');
  }
  const user = await User.findOne(req.session.userID);
  if (!user) {
    return res.json('not authenticated');
  }
  return res.json(user);
});

userRouter.post('/bio', async (req, res) => {
  try {
    const bio = req.body;
    // TODO: when session is working, remove this hardcoded uuid
    const user = await User.findOneOrFail('d550f55b-fc58-4a48-a980-1068cc84fbe4');
    user.bio = bio.text;
    await user.save();
    res.status(201).json('OK');
  } catch (e) {
    console.error(e);
    res.status(500).json(e.message);
  }
});

export default userRouter;
