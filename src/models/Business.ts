import mongoose from 'mongoose';
import { Businessmodel } from '../typings/business';

const BusinessSchema = new mongoose.Schema({
  /** 
     *   Everything in Mongoose starts with a Schema. Each schema maps 
  to a MongoDB collection and defines the shape of the documents
  within that collection.
    */

  name: {
    type: String,
    required: true,
    min: 3,
    max: 125,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    min: 8,
    max: 16,
    required: true,
  },

  regno: {
    type: String,
  },

  phoneOne: {
    type: String,
    required: true,
    length: 11,
  },
  phoneTwo: {
    type: String,
    length: 11,
  },
  postcode: {
    type: String,
  },
  customerRelationOfficer: {
    name: {
      type: String,
    },
    position: {
      type: String,
    },
  },
  connections: {
    website: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
    linkedin: {
      type: String,
    },
  },
  officeAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  avatar: {
    type: String,
  },
});

export default mongoose.model<Businessmodel>('Business', BusinessSchema);
