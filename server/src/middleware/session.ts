import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';

const checkSession = async (req: Request, _: Response, next: NextFunction) => {
  const { session } = req;
  const regex = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/;
  if (session && session.userID && regex.test(session.userID)) {
    try {
      const user = await User.findOneOrFail(session.userID);
      if (!user) {
        next('user does not exist');
      } else {
        next();
      }
    } catch (error) {
      next(new Error('something went terribly wrong, please login again'));
    }
  } else {
    next(new Error('Please login again'));
  }
};

export { checkSession };
