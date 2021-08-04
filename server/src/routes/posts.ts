import {Router} from 'express';
import multer from 'multer';
import {Post} from "../entity/Post";
import {User} from "../entity/User";
import path from "path";

const router = Router();

const storage = multer.diskStorage({
  destination: (_, __, cv) => {
    cv(null, 'post');
  },
  filename: async (req, file, cb) => {

    const date = Date.now();
    const inserts = await Post.create({
      photoUrl: `${req.protocol}://${req.hostname}:5000/post/${date}/${path.extname(file.originalname)}`
    })
  },
});

