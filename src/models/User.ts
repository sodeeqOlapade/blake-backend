import mongoose from 'mongoose';
import { Usermodel } from '../typings/user';

const UserSchema = new mongoose.Schema({
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

  phone: {
    type: String,
    required: true,
    length: 11,
  },

  address: {
    type: String,
  },

  avatar: {
    type: String,
  },
});

export default mongoose.model<Usermodel>('User', UserSchema);
