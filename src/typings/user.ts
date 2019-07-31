import { Document } from 'mongoose';

//interface for User to give typings to User obj/instance
export interface User {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

/**
    another interface instance that extends user interface and mongoose document
    to extend it's functionalities. It shall be used to give typings
    (i.e type and intellisense) to user model instances
 * @export
 * @interface Usermodel
 * @extends {User}
 * @extends {Document}
 */
export interface Usermodel extends User, Document {}
