import { Document } from 'mongoose';

//interface for User to give typings to User obj/instance
export interface Business {
  name: string;
  email: string;
  password: string;
  regno?: string;
  phoneOne: string;
  phoneTwo?: string;
  postcode?: string;
  customerRelationOfficers?: CustomerRelationOfficer[];
  connections?: Connection;
  officeAddress: string;
  city?: string;
  state?: string;
  avatar?: string;
  created?: Date;
}

export interface Connection {
  website?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

export interface CustomerRelationOfficer {
  name: string;
  position: string;
}


// export interface IBusinessPayload {
//   user: IUser;
// }
// export interface IUser {
//   id: string;
// }

// export interface IUserRequest extends express.Request {
//   user?: IUser;
// }

/**
    another interface instance that extends user interface and mongoose document
    to extend it's functionalities. It shall be used to give typings
    (i.e type and intellisense) to user model instances
 * @export
 * @interface Usermodel
 * @extends {User}
 * @extends {Document}
 */
export interface Businessmodel extends Business, Document {}
