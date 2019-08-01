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

  phone: {
    type: String,
    required: true,
    length: 11,
  },

  address: {
    type: String,
    required:true
  },

  avatar: {
    type: String,
  },
});

export default mongoose.model<Businessmodel>('Business', BusinessSchema);
