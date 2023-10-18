import { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  name: string;
  email: string;
  address: object;
  phone: string;
  createdBy: Schema.Types.ObjectId;
}
