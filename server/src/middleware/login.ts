import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';

const loginRequired = async (req: Request, _: Response, next: NextFunction) => {
  // console.log(req.session);
  if (req.session && req.session.userID) {
    const user = await User.findOne(req.session.userID);
    if (!user) {
      next(new Error('User not found'));
    }
    next();
  } else {
    next(new Error('You must be logged in to view this page'));
  }
};

export default loginRequired;
