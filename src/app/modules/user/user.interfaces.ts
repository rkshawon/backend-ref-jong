/* eslint-disable no-unused-vars */
import mongoose, { Document } from 'mongoose';

export enum USER_ROLE {
  OWNER = 'owner',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
  RESELLER = 'reseller',
}

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  role: USER_ROLE;
  status: string;
  is_email_verified: boolean;
  password: string;
  img: string;
  client: mongoose.Types.ObjectId;
}
