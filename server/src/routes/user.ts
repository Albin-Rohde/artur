import { Router } from 'express';
import { Like } from 'typeorm';
import { User } from '../entity/User';
import loginRequired from '../middleware/login';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  if (!req.session.userID) {
    return res.status(401).json('not authenticated');
  }
  const user = await User.findOne(req.session.userID);
  if (!user) {
    return res.status(401).json('not authenticated');
  }
  return res.json(user);
});

userRouter.post('/bio', loginRequired, async (req, res) => {
  try {
    const id = req.session.userID;
    const { bio } = req.body;
    if (!bio || typeof bio !== 'string') {
      return res.status(400).json('please provide a bio');
    }
    // TODO: when session is working, remove this hardcoded uuid
    const user = await User.findOne(id);

    if (!user) {
      return res.status(404).json('User not found');
    }

    await User.update({ id: user.id }, { bio });
    res.status(201).json('OK');
    // tslint:disable-next-line: prettier
  } catch (e) {
    console.error(e);
    res.status(500).json((e as any).message);
  }
});

userRouter.post('/follower/', loginRequired, async (req, res) => {
  try {
    const { userID } = req.session;
    const { follower_id } = req.body;
    const regex = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/;

    const isUUID = regex.test(follower_id);
    if (!isUUID) {
      return res.json('not a valid uuid');
    }

    const [isUser, user] = await Promise.all([
      User.findOne(follower_id),
      (User.findOne({ where: { id: userID } }) as unknown) as User,
    ]);

    if (!isUser) {
      return res.json('user not found');
    }

    if (typeof user.followers === 'undefined' || user.followers === null) {
      await User.createQueryBuilder()
        .where('id = :id', { id: user.id })
        .update({ followers: [follower_id] })
        .execute();
      return res.json({ user, message: 'user added to followers' });
    } else {
      if (user.followers.includes(follower_id)) {
        return res.json('user already following');
      } else {
        await User.createQueryBuilder()
          .where('id = :id', { id: user.id })
          .update({ followers: [...user.followers, follower_id] })
          .execute();

        return res.json({ user, message: 'user added to followers' });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

userRouter.post('/search', loginRequired, async (req, res) => {
  try {
    const { query } = req.body;
    const users = await User.getRepository().find({
      where: {
        name: Like(`%${query}%`),
      },
    });
    return res.json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default userRouter;
