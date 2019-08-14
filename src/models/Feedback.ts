import mongoose from 'mongoose';
import {Feedbackmodel} from '../typings/feedback'
const Schema = mongoose.Schema;

const FeedbackSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  business: {
    type: Schema.Types.ObjectId,
    ref: 'businesses',
    required:true
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      created: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  created: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model<Feedbackmodel>('Feedback', FeedbackSchema);

