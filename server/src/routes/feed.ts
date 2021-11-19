import { Router } from 'express';
import { Post } from '../entity/Post';
import { User } from '../entity/User';
import { checkSession } from '../middleware/session';

const router = Router();

router.get('/', checkSession, async (req, res) => {
  const id = req.session.userID;
  const { type } = req.query;

  try {
    if (
      !['follower', 'color', 'likes', 'relevance', 'time'].includes(
        type as string
      )
    ) {
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

        case 'likes':
          const posts_likes = await Post.find();
          posts_likes.sort(
            (p1, p2) => Number(p2.likes.length) - Number(p1.likes.length)
          );
          posts_likes.map(post => {
            if (post.likes.length) {
              posts.push(post);
            }
          });
          break;

        case 'relevance':
          const p1 = await Post.find();
          p1.sort(post => Number(post.createdAt) / Number(post.likes.length));

          posts.push(...p1);
          break;

        case 'time':
          const p2 = await Post.find();
          p2.sort((p1, p2) => Number(p2.createdAt) - Number(p1.createdAt));
          posts.push(...p2);
          break;
      }

      return res.json({ posts, msg: 'success' });
    }
  } catch (error) {
    console.log(error);
    return res.json(error).status(400);
  }
});

router.get('/my', checkSession, async (req, res) => {
  const id = req.session.userID;
  const { type } = req.query;
  try {
    const posts: Post[] = [];
    const post = await Post.find({ where: { ownerId: id } });
    if (!post) {
      return res.status(404).json('Post not found');
    }
    if (
      !['follower', 'color', 'likes', 'relevance', 'time'].includes(
        type as string
      )
    ) {
      return res.status(400).json('Invalid type');
    } else {
      switch (type) {
        case 'color':
          post.sort((p1, p2) => Number(p1.color) - Number(p2.color));
          post.map(post => {
            if (post.color) {
              posts.push(post);
            }
          });
          break;

        case 'likes':
          post.sort(
            (p1, p2) => Number(p2.likes.length) - Number(p1.likes.length)
          );
          post.map(p => {
            if (p.likes.length) {
              posts.push(p);
            }
          });
          break;

        case 'time':
          post.sort((p1, p2) => Number(p2.createdAt) - Number(p1.createdAt));
          posts.push(...post);
          break;
      }

      return res.json({ posts, msg: 'success' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json('not able to get your feed');
  }
});

export { router as feedRouter };
