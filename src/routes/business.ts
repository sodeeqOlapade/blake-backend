import express, { Request, Response, Router } from 'express';
import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import Business from '../models/Business';
import gravatar from 'gravatar';
import bcrypt from 'bcrypt';
import config from 'config';
import { IUserPayload, IUserRequest } from '../typings/user';
import { Businessmodel } from '../typings/business';
import auth from '../middleware/auth';

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
  phoneOne: Joi.string()
    .required()
    .length(11)
    .error(() => {
      return 'phone number is required';
    }),
  officeAddress: Joi.string()
    .required()
    .error(() => {
      return 'address is required';
    }),
  avatar: Joi.string(),
};

//schema to validate business update object
const businessUpdateSchema = {
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
  regno: Joi.string(),
  phoneOne: Joi.string()
    .length(11)
    .required()
    .error(() => {
      return 'phone number is required';
    }),
  phoneTwo: Joi.string().length(11),
  postcode: Joi.string().max(10),
  customerRelationOfficer: Joi.object().keys({
    name: Joi.string()
      .min(3)
      .max(125)
      .required()
      .error(() => {
        return 'contact person name is required';
      }),
    position: Joi.string()
      .max(50)
      .required()
      .error(() => {
        return 'contact person position required';
      }),
  }),
  connections: Joi.object().keys({
    website: Joi.string(),
    facebook: Joi.string(),
    instagram: Joi.string(),
    twitter: Joi.string(),
    linkedin: Joi.string(),
  }),
  officeAddress: Joi.string()
    .required()
    .error(() => {
      return 'address is required';
    }),
  city: Joi.string()
    .min(3)
    .max(16),
  state: Joi.string()
    .min(3)
    .max(16),
  avatar: Joi.string(),
};

//@routes     POST api/business
//@desc       Register new business
//@access     Public
router.post('/', async (req: Request, res: Response) => {
  const { error } = Joi.validate(req.body, businessSchema);
  if (error) return res.status(400).json(error.details[0].message);

  try {
    const { name, email, password, phoneOne, officeAddress } = req.body;

    //check if user exists
    let business: Businessmodel | null = await Business.findOne({ email });
    //more checks should go in here
    //rethink error method to client
    if (business) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'email already in use' }] });
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
      phoneOne,
      officeAddress,
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

//@routes     PUT api/users
//@desc       Update existing user
//@access     Private
router.put('/update', auth, async (req: IUserRequest, res: Response) => {
  const { error } = Joi.validate(req.body, businessUpdateSchema);
  if (error) return res.status(400).json(error.details[0].message);

  try {
    //check if user exists
    const business: Businessmodel | null = await Business.findByIdAndUpdate(
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
    res.status(200).json(business);
  } catch (err) {
    console.error('Error: ', err.message);
    return res.status(500).send('Server error...');
  }
});

export default router;
