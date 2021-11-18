import { Router } from 'express';
import { Post } from '../entity/Post';
import { User } from '../entity/User';
import { checkSession } from '../middleware/session';

const router = Router();

router.get('/', checkSession, async (req, res) => {
  const id = req.session.userID;
  const { type } = req.query;

  try {
    if (!['follower', 'color', 'likes'].includes(type as string)) {
      return res.status(400).json('Invalid type');
    } else {
      const user = await User.findOneOrFail(id);
      const posts: Post[] = [];

      switch (type) {
        case 'follower':
          console.log(user.followers);
          if (
            !user.followers ||
            user.followers.length < 0 ||
            user.followers === null ||
            user.followers === undefined
          ) {
            const no_posts = await Post.find({ take: 20 });
            return res.json({ posts: no_posts, msg: 'no followers' });
          }

          for (const follower of user.followers) {
            const user_post = await Post.find({
              where: {
                ownerId: follower,
              },
            });
            posts.push(...user_post);
          }

          posts.sort((p1, p2) => Number(p2.createdAt) - Number(p1.createdAt));
          break;

        case 'color':
          const p = await Post.find({
            take: 20,
          });
          p.sort((p1, p2) => Number(p1.color) - Number(p2.color));
          p.map(post => {
            if (post.color) {
              posts.push(post);
            }
          });
          console.log(posts);
          break;
      }

      return res.json({ posts, msg: 'success' });
    }
  } catch (error) {
    console.log(error);
    return res.json(error).status(400);
  }
});

export { router as feedRouter };
