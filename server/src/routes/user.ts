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

userRouter.post('/follower/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { follower_id } = req.body;
    const regex = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/;

    const isUUID = regex.test(follower_id);
    if (!isUUID) {
      return res.json('not a valid uuid');
    }

    const [isUser, isNotTheOnlyOne]: [User[], User[] | []] = await Promise.all([
      User.find(follower_id),
      (User.query('select * from users where $1 = ANY(followers)', [
        follower_id,
      ]) as unknown) as User[] | [],
    ]);

    if (!isUser || isNotTheOnlyOne.length > 0) {
      return res.json('already added or not a valid user');
    } else {
      const user2 = await User.query(
        'UPDATE users SET followers = ARRAY_APPEND(followers, $1) WHERE id = $2 RETURNING *',
        [follower_id, id]
      );
      console.log(user2);
      return res.json(user2);
    }
  } catch (error) {
    console.log(error);
  }
});

export default userRouter;
