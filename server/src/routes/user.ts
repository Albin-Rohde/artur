import { Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import * as path from 'path';
import { Like } from 'typeorm';
import { User } from '../entity/User';
import loginRequired from '../middleware/login';

const userRouter = Router();

userRouter.post('/upload', loginRequired, async (req, res) => {
  try {
    if (!req.files) {
      return res.json({
        status: false,
        message: 'No file uploaded',
      });
    }

    if (!req.files.avatar) {
      return res.json({
        status: false,
        message: 'Not sufficient data',
      });
    }

    const user = await User.findOne(req.session.userID);

    if (
      user?.avatar &&
      (user.avatar.includes('googleusercontent') ||
        user.avatar.includes('githubusercontent'))
    ) {
      return res.status(401).json("You can't change your avatar");
    }

    let avatar = req.files.avatar as UploadedFile;

    await avatar.mv(`./avatars/${avatar.md5}${path.extname(avatar.name)}`);

    await User.update(
      { id: req.session.userID },
      {
        avatar: `${req.protocol}://${req.hostname}:${
          process.env.SERVER_PORT
        }/user/avatars/${avatar.md5}${path.extname(avatar.name)}`,
      }
    );
    return res.json({
      status: true,
      message: 'File uploaded',
    });
  } catch (error) {
    return res.json({
      status: false,
      message: error,
    });
  }
});

userRouter.get('/avatars/:id', loginRequired, (req, res) => {
  const { id } = req.params;

  return res.sendFile(path.join(__dirname, `../../avatars/${id}`));
});

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
      return res.status(401).json('User not found');
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
      return res.status(400).json('not a valid uuid');
    }

    const [userToFollow, currentUser] = await Promise.all([
      User.findOne(follower_id),
      (User.findOne({ where: { id: userID } }) as unknown) as Promise<User>,
    ]);

    if (!userToFollow) {
      return res.status(401).json('user not found');
    }

    if (
      typeof currentUser.followers === 'undefined' ||
      currentUser.followers === null
    ) {
      await User.createQueryBuilder()
        .where('id = :id', { id: currentUser.id })
        .update({ followers: [follower_id] })
        .execute();
      return res.json({
        user: currentUser,
        message: 'user added to followers',
      });
    } else {
      if (currentUser.followers.includes(follower_id)) {
        return res.json('user already following');
      } else {
        await User.createQueryBuilder()
          .where('id = :id', { id: currentUser.id })
          .update({ followers: [...currentUser.followers, follower_id] })
          .execute();

        return res.json({
          user: currentUser,
          message: 'user added to followers',
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
});

userRouter.post('/search', loginRequired, async (req, res) => {
  try {
    let users: User[] = [];
    const { query } = req.body;
    if (!query || query.length === '') {
      users = await User.find({
        take: 10,
      });
    } else {
      users = await User.getRepository().find({
        where: {
          name: Like(`${query}%`),
        },
      });
    }

    users = users.filter(user => user.id !== req.session.userID);

    return res.json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
});

userRouter.post('/changeDisp', loginRequired, async (req, res) => {
  try {
    const { userID } = req.session;
    const { displayName } = req.body;
    if (!displayName || typeof displayName !== 'string') {
      return res.status(400).json('please provide a displayName');
    }

    await User.update({ id: userID }, { displayName });

    return res.json('OK');
  } catch (e) {
    console.error(e);
    res.status(500).json((e as any).message);
  }
});

userRouter.get('/hej123', (req, res) => {
  res.send('jaa');
});
// userRouter.post('/avatar', (req, res) => {
//   console.log(req.body);
//   console.log(req.file);
//   res.send('ok');
// });

export default userRouter;
