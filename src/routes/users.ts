import express, { Request, Response, Router } from 'express';
import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import gravatar from 'gravatar';
import bcrypt from 'bcrypt';
import config from 'config';
import { IUserPayload, IUserRequest, Usermodel } from '../typings/user';
import auth from '../middleware/auth';

const router: Router = express.Router();

//@routes     GET api/auth
//@desc       Test route
//@access     Public
router.get('/', function(req: Request, res: Response) {
  res.json('respond with a resource');
});

//schem to validate users object
const userSchema = {
  name: Joi.string()
    .min(3)
    .max(125)
    .required()
    .error(() => {
      return 'name is required';
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .error(() => {
      return 'email is required';
    }),
  password: Joi.string()
    .min(8)
    .max(15)
    .required()
    .error(() => {
      return 'password is required';
    }),
  phone: Joi.string().length(11),
  address: Joi.string(),
  avatar: Joi.string(),
};

const userUpdateSchema = {
  name: Joi.string()
    .min(3)
    .max(125)
    .required()
    .error(() => {
      return 'name is required';
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .error(() => {
      return 'email is required';
    }),
  phone: Joi.string().length(11),
  gender: Joi.string().max(17),
  address: Joi.string(),
  avatar: Joi.string(),
};

//@routes     POST api/users
//@desc       Register new user
//@access     Public
router.post('/', async (req: Request, res: Response) => {
  const { error } = Joi.validate(req.body, userSchema);
  if (error) return res.status(400).json(error.details[0].message);

  try {
    const { name, email, password, phone, address } = req.body;

    //check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'email already in use' }] });
    }

    //get user avatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    //create User instance
    user = new User({
      name,
      email,
      phone,
      address,
      avatar,
    });

    //hash user password with bcrypt
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

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
    return res.status(500).send('Server error...');
  }
});

//@routes     PUT api/users
//@desc       Update existing user
//@access     Private
router.put('/update', auth, async (req: IUserRequest, res: Response) => {
  const { error } = Joi.validate(req.body, userUpdateSchema);
  if (error) return res.status(400).json(error.details[0].message);

  try {
    //check if user exists
    const user : Usermodel | null = await User.findByIdAndUpdate(
      { _id: req.user!.id },
      { $set: req.body },
      { new: true },
      err => {
        if (err) {
          res.status(400).json({ msg: err.message });
          return;
        }
      },
    ).select('-password');
    res.status(200).json(user);
  } catch (err) {
    console.error('Error: ', err.message);
    return res.status(500).send('Server error...');
  }
});

export default router;
