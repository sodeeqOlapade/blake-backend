import express, { Request, Response, Router } from 'express';
import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import Business from '../models/Business';
import gravatar from 'gravatar';
import bcrypt from 'bcrypt';
import config from 'config';
import { IUserPayload, IUserRequest } from '../typings/user';
import { Businessmodel, CustomerRelationOfficer } from '../typings/business';
import auth from '../middleware/auth';
import sendResponse from '../helpers/response';

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

const contactPersonSchema = {
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
};

//@routes     POST api/businesse
//@desc       Register new business
//@access     Public
router.post('/', async (req: Request, res: Response) => {
  const { error } = Joi.validate(req.body, businessSchema);
  if (error)
    return res.json(
      sendResponse(
        httpStatus.BAD_REQUEST,
        error.details[0].message,
        error.details[0].message,
        null,
      ),
    );

  try {
    const { name, email, password, phoneOne, officeAddress } = req.body;

    //check if user exists
    let business: Businessmodel | null = await Business.findOne({ email });
    //more checks should go in here
    //rethink error method to client
    if (business) {
      return res.json(
        sendResponse(
          httpStatus.BAD_REQUEST,
          'email already in use',
          'email already in use',
          null,
        ),
      );
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
      { expiresIn: 3600 },
      (err, token) => {
        if (err) {
          throw err;
        }

        res.json(sendResponse(httpStatus.OK, 'Signup Successful', null, token));
      },
    );
  } catch (err) {
    console.error('Error: ', err.message);
    return res.status(500).send('Server error...');
  }
});

//@routes     PUT api/business
//@desc       Update existing business
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

// @route   DELETE api/businesses/
// @desc    Delete a business from db
// @access  Private
router.delete('/', auth, async (req: IUserRequest, res: Response) => {
  try {
    const business: Businessmodel | null = await Business.findOneAndRemove({
      _id: req.user!.id,
    });
    res.status(200).json(business);
  } catch (error) {
    console.error('Error: ', error.message);
    return res.status(500).send('Server error...');
  }
});

// @route    PUT api/businesses/update/business_is/contactperson
// @desc     Add Contact Person(s) to a business
// @access   Private
router.put('/contactperson', auth, async (req: IUserRequest, res: Response) => {
  const { error } = Joi.validate(req.body, contactPersonSchema);
  if (error) return res.status(400).json(error.details[0].message);

  const { name, position } = req.body;

  const newContactPerson: CustomerRelationOfficer = {
    name,
    position,
  };

  try {
    const business: Businessmodel | null = await Business.findOne({
      _id: req.user!.id,
    });

    //add logic to check if the name has been added before
    business!.customerRelationOfficers!.push(newContactPerson);

    await business!.save();

    res.json(business);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/businesses/update/business_id/contactperson/:contactperson_id'
// @desc     Update Contact Person(s) info
// @access   Private
router.put(
  '/contactperson/:contactperson_id',
  auth,
  async (req: IUserRequest, res: Response) => {
    const { error } = Joi.validate(req.body, contactPersonSchema);
    if (error) return res.status(400).json(error.details[0].message);

    const { name, position } = req.body;

    const newContactPerson: CustomerRelationOfficer = {
      name,
      position,
    };

    try {
      //find business first
      const business: Businessmodel | null = await Business.findOne({
        _id: req.user!.id,
      });
      //find the contact person to be updated
      const contactpersonIndex = business!
        .customerRelationOfficers!.map((contactperson: any) =>
          contactperson._id.toString(),
        )
        .indexOf(req.params.contactperson_id);

      if (contactpersonIndex === -1) {
        console.error(
          `Contact Person ${req.params.contactperson_id} Does not exist`,
        );
        return res.status(500).json({ msg: 'Server Error' });
      }

      business!.customerRelationOfficers![
        contactpersonIndex
      ] = newContactPerson;

      await business!.save();

      res.json(business);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route    DELETE api/businesses/update/business_id/contactperson/:contactperson_id'
// @desc     Delete Contact Person(s)  info on a business account
// @access   Private
router.delete(
  '/contactperson/:contactperson_id',
  auth,
  async (req: IUserRequest, res: Response) => {
    try {
      //find business first
      const business: Businessmodel | null = await Business.findOne({
        _id: req.user!.id,
      });
      //find the contact person to be updated
      const contactpersonIndex = business!
        .customerRelationOfficers!.map((contactperson: any) =>
          contactperson._id.toString(),
        )
        .indexOf(req.params.contactperson_id);

      if (contactpersonIndex === -1) {
        console.error(
          `Contact Person ${req.params.contactperson_id} Does not exist`,
        );
        return res.status(500).json({ msg: 'Server Error' });
      }

      business!.customerRelationOfficers!.splice(contactpersonIndex, 1);

      await business!.save();

      res.json(business);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

export default router;
