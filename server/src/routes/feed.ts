import { Router } from 'express';
import { Post } from '../entity/Post';

const router = Router();

router.get('/', async (req, res) => {
  const posts = await Post.find({ take: 10 });
  posts.sort((p1, p2) => Number(p2.createdAt) - Number(p1.createdAt));
  console.log(posts);
  res.json(posts);
});

export { router as feedRouter };
