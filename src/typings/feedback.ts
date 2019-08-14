import { Document } from 'mongoose';

export interface Feedback {
  user: string;
  business: string;
  text: string;
  name: string;
  avatar: string;
  likes?: Like[];
  comments?: Comment[];
  created: Date;
}

export interface Like {
  user: string;
}

export interface Comment {
  id?: string;
  user: string;
  text: string;
  name: string;
  avatar: string | undefined;
}

export interface Feedbackmodel extends Feedback, Document {}
