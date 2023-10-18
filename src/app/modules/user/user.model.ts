import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';
import config from '../../../config';
import { IUser, USER_ROLE } from './user.interfaces';

const UserSchema = new Schema<IUser>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: Object.values(USER_ROLE), required: true },
    status: { type: String, enum: ['pending', 'active', 'inactive'], default: 'pending' },
    password: { type: String },
    img: { type: String },
    is_email_verified: { type: Boolean, default: false },
    client: { type: Schema.Types.ObjectId, ref: 'client', required: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as Partial<IUser>;
  if (update.password) {
    update.password = await bcrypt.hash(update.password, Number(config.bycrypt_salt_rounds));
  }
  next();
});

const UserModel = mongoose.model<IUser>('user', UserSchema);

export default UserModel;
