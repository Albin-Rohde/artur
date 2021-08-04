import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import * as yup from 'yup';
import { mediaTypes } from '../constants/MediaTypes';
import { Post } from '../entity/Post';

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

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'post');
  },
  filename: async (req, file, cb) => {
    // const id = req.query.id;
    const date = Date.now();
    const inserts = await Post.create({
      photoUrl: `${req.protocol}://${
        req.hostname
      }:5000/post/${date}${path.extname(file.originalname)}`,
    }).save();
    console.log(inserts);
    req.res?.json(inserts.id);
    cb(null, date + path.extname(file.originalname));
  },
});

const filter = (
  _: Express.Request,
  file: Express.Multer.File,
  cb: (error: null, idk: boolean) => void
) => {
  if (mediaTypes.includes(file.mimetype) || Number(file.size) < 100000) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uplad = multer({ storage, fileFilter: filter });

router.post('/create/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { post_description, post_title } = req.body;
    postShcema.validateSync(
      {
        postDesription: post_description,
        postTitle: post_title,
      },
      { abortEarly: false }
    );
    console.log(req.body);

    await Post.update(
      { id },
      { title: post_title, description: post_description }
    );

    return res.json('OK');
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.json(error.errors).status(400);
    }
    console.log(error);
    // return res.status(500);
  }
});

router.post('/upload', uplad.single('image'));

router.get('/:id', (req, res) => {
  const { id } = req.params;

  return res.sendFile(path.join(__dirname, `../../post/${id}`));
});
export default router;
