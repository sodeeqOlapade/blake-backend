import express, { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Business from '../models/Business';
import bcrypt from 'bcrypt';
import config from 'config';
import auth from '../middleware/auth';
import { IUserRequest, IUserPayload, Usermodel } from '../typings/user';
import { Businessmodel } from '../typings/business';

const router: Router = express.Router();

//@routes     GET api/auth
//@desc       Authenticates a signed in user
//@access     Public
router.get('/', auth, async (req: IUserRequest, res: Response) => {
  //get user from db and send it back to client
  try {
    /** 
      ! symbol is the typescript non-null assertion saying user 
      shall always be available aty this point
      below we check if attempt to fetch user is for business or user  
    **/
    const business = await Business.findById(req.user!.id).select('-password');
    if (business) {
      res.status(200).json(business);
      return;
    }
    //if not business it's then user
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
    let user: Usermodel | Businessmodel | null = await User.findOne({ email });
    if (!user) {
      user = await Business.findOne({ email });
    }
    //check if user or business and allow sign in if any else error
    if (!user) {
      res
        .status(400)
        .json({ errors: [{ msg: 'Your account name or password is incorrect' }] });

      return;
    }

    //confirm password match
    const passwordIsValid: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!passwordIsValid) {
      res.status(400).json({ errors: [{ msg: 'Your account name or password is incorrect' }] });

      return;
    }

    //generate a payload
    const payload: IUserPayload = {
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
