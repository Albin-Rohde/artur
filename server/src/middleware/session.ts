import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';

const checkSession = (req: Request, res: Response, next: NextFunction) => {
  const { session } = req;
  if (session && session.userID) {
    try {
      const user = User.findOneOrFail(session.userID);
      if (!user) {
        next('user does not exist');
      } else {
        next();
      }
    } catch (error) {
      next('something went terribly wrong, please login again');
    }
  } else {
    next(new Error('Please login again'));
  }
};

export { checkSession };
