import express, { Request, Response, Router } from 'express';
import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import Business from '../models/Business';
import gravatar from 'gravatar';
import bcrypt from 'bcrypt';
import config from 'config';
import { IUserPayload } from '../typings/user';

const router: Router = express.Router();

//@routes     GET api/business
//@desc       Test route
//@access     Public
router.get('/', function(req: Request, res: Response) {
  res.json('respond with a resource');
});

//schema to validate business object
const businessSchema = {
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
  regno: Joi.string(),
  phone: Joi.string()
    .length(11)
    .required()
    .error(() => {
      return 'phone number is required';
    }),
  address: Joi.string()
    .required()
    .error(() => {
      return 'address is required';
    }),
  avatar: Joi.string(),
};

//@routes     POST api/business
//@desc       Register new business
//@access     Public
router.post('/', async (req: Request, res: Response) => {
  const { error } = Joi.validate(req.body, businessSchema);
  if (error) return res.status(400).json(error.details[0].message);

  try {
    const { name, email, password, phone, address, regno } = req.body;

    //check if user exists
    let business = await Business.findOne({ email });
    //more checks should go in here
    //rethink error method to client
    if (business) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'business already exist' }] });
    }

    //get business avatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    //create User instance
    business = new Business({
      name,
      email,
      phone,
      address,
      regno,
      avatar,
    });

    //hash user password with bcrypt
    const salt = await bcrypt.genSalt(10);

    business.password = await bcrypt.hash(password, salt);

    await business.save();

    //generate a payload
    const payload: IUserPayload = {
      user: {
        id: business.id,
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

export default router;
