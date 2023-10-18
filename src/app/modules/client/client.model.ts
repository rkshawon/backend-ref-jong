import mongoose, { Schema } from 'mongoose';
import { IClient } from './client.interface';

const ClientSchema = new Schema<IClient>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: Object, required: true },
  phone: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
});

const ClientModel = mongoose.model<IClient>('client', ClientSchema);

export default ClientModel;
