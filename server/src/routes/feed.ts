import { Request, Router } from 'express';
import * as yup from 'yup';
import { Post } from '../entity/Post';
import { User } from '../entity/User';

const typeSchema = yup.object().shape({
  type: yup
    .string()
    .oneOf(['follower', 'color', 'likes', 'relevance', 'time'], 'Invalid type')
    .required(),
});

const router = Router();

interface Query {
  type?: string;
}

router.get(
  '/',
  async (req: Request<{}, {}, {}, Query, Record<any, any>>, res) => {
    const id = req.session.userID;
    console.log(id);
    const { type } = req.query;

    try {
      typeSchema.validateSync({ type }, { abortEarly: false });

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
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.json(error.errors).status(400);
      }
      console.log(error);
      return res.json(error as any).status(400);
    }
  }
);

router.get('/my', async (req: Request<{}, {}, Query>, res) => {
  const id = req.session.userID;
  const { type } = req.query;
  try {
    const posts: Post[] = [];
    const post = await Post.find({ where: { ownerId: id } });
    if (!post) {
      return res.status(404).json('Post not found');
    }

    typeSchema.validateSync({ type }, { abortEarly: false });

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
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.json(error.errors).status(400);
    }
    console.error(error);
    return res.status(500).json('not able to get your feed');
  }
});

export { router as feedRouter };
