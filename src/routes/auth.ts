import express, { Router, Request, Response } from 'express';
import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import gravatar from 'gravatar';
import bcrypt from 'bcrypt';
import config from 'config';
import auth from '../middleware/auth';
import { IUserRequest, IUserPayload } from '../typings/user';

const router: Router = express.Router();

//@routes     GET api/auth
//@desc       Authenticates a signed in user
//@access     Public
router.get('/', auth, async (req: IUserRequest, res: Response) => {
  //get user from db and send it back to client
  try {
    const user = await User.findById(req.user!.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user: ', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

//@routes     POST api/auth
//@desc       Login a authenticated user
//@access     Public
router.post('/', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'No User with these credentials' }] });
    }

    //confirm password match
    const passwordIsValid : boolean = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(400).json({ errors: [{ msg: 'Invalid email or password' }] });
    }

    //generate a payload
    const payload : IUserPayload = {
      user: {
        id: user.id,
      },
    };

    //sign a jwt token

    jwt.sign(
      payload,
      config.get('jwtSecretToken'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) {
          throw err;
        }

        res.json({ token });
      },
    );
  } catch (err) {
    console.error('Error: ', err.message);
    res.status(500).send('Server error...');
  }
});

export default router;
