
import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
    {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const UsersCollection = model('users', usersSchema)