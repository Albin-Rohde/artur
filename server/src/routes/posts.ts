import { Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import * as yup from 'yup';
import { Post } from '../entity/Post';
import loginRequired from '../middleware/login';
import { predict } from '../util/color-predictor';

const router = Router();

const postShcema = yup.object().shape({
  postTitle: yup
    .string()
    .min(4)
    .max(40),
  postDescription: yup
    .string()
    .min(0)
    .max(255),
});

router.post('/create/:id', loginRequired, async (req, res) => {
  try {
    const { userID } = req.session;
    const { id } = req.params;
    console.log(userID, id);
    const { post_description, post_title } = req.body;
    postShcema.validateSync(
      {
        postDesription: post_description,
        postTitle: post_title,
      },
      { abortEarly: false }
    );

    const post = await Post.findOne(id);

    if (post?.ownerId !== userID) {
      throw new Error('Not your post');
    }
    console.log(
      path.join(__dirname, `../../post/${post?.photoUrl.split('/')[4]}`)
    );

    const color = await predict(
      path.join(__dirname, `../../post/${post?.photoUrl.split('/')[4]}`)
    );
    console.log(color);

    if (typeof color !== 'number') {
      await Post.update(
        { id },
        { title: post_title, description: post_description, color }
      );
    } else {
      await Post.update(
        { id },
        { title: post_title, description: post_description }
      );
    }
    return res.json('OK');
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.json(error.errors).status(400);
    }
    console.log(error);
    return res.status(500).json(error);
  }
});

router.post('/upload', loginRequired, async (req, res) => {
  try {
    const id = req.session.userID;
    if (!req.files) {
      return res.json({
        status: false,
        message: 'No file uploaded',
      });
    }
    const file = req.files.image as UploadedFile;
    if (!file) {
      return res.json({
        status: false,
        message: 'Not sufficient data',
      });
    }

    await file.mv(`./post/${file.md5}${path.extname(file.name)}`);

    const post = await Post.create({
      photoUrl: `${req.protocol}://${req.hostname}:${
        process.env.SERVER_PORT
      }/posts/${file.md5}${path.extname(file.name)}`,
      createdAt: Date.now().toString(),
      ownerId: id,
    }).save();

    return res.json(post.id);
  } catch (error) {
    return res.json({
      status: false,
      message: error,
    });
  }
});

router.post('/like', loginRequired, async (req, res) => {
  const id = req.session.userID;
  try {
    const { postId } = req.body;
    const post = await Post.findOneOrFail(postId);

    if (!post) {
      return res.status(404).json('Post not found');
    }

    const post2 = await Post.query(
      'UPDATE users SET likes = ARRAY_APPEND(followers, $1) WHERE id = $2 RETURNING *',
      [id, postId]
    );

    if (!post2) {
      return res.status(404).json('unable to like');
    }
    return res.json(post2);
  } catch (error) {
    console.error(error);
    return res.status(500).json('unable to like');
  }
});

router.get('likes', loginRequired, async (req, res) => {
  const id = req.session.userID;
  try {
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      return res.status(404).json('Post not found');
    }

    if (!post.likes || post.likes.length === 0 || post.likes.length < 0) {
      return res.json('no likes');
    }

    return res.json(post.likes.length);
  } catch (error) {
    console.error(error);
    return res.status(500).json('unable to like');
  }
});

router.get('/:id', loginRequired, (req, res) => {
  const { id } = req.params;

  return res.sendFile(path.join(__dirname, `../../post/${id}`));
});

export default router;
