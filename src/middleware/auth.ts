import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { IUserRequest } from '../typings/user';

async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<IUserRequest | undefined> {
  //get Authorization from request header
  const token = req.headers['authorization'];

  //check if token do not exist

  if (!token) {
    res.status(401).json({ msg: 'Please login.' });

    return;
  }

  try {
    //verify available token
    const verifiedToken = jwt.verify(token, config.get('jwtSecretToken'));
    //below is type assertion to avoid tsc from erroing
    (<IUserRequest>req).user = (<IUserRequest>verifiedToken).user;

    next();
  } catch (err) {
    console.error('Error verifying token: ', err.message);

    res.status(500).json({ msg: 'Please login' });

    return;
  }
}

export default authMiddleware;
