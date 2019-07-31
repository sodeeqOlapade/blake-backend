import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import {IUserRequest, IUserPayload} from '../typings/user'
const authMiddleware = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction,
) => {
  //get x-auth-token from request header
  const token = req.header('x-auth-token');

  //check if token do not exist

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    //verify available token
    const verifiedToken = jwt.verify(token, config.get('jwtSecretToken'));
    //below is type assertion to avoid tsc from erroing
    req.user = (verifiedToken as IUserRequest).user;
    next();
  } catch (err) {
    console.error('Error verifying token: ', err.message);
    return res.json({ msg: err.message });
  }
};

module.exports = authMiddleware;
