import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    name: { type: String, default: 'User' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['woman', 'man'], default: 'woman' },
    weight: { type: Number, min: 0, max: 500, default: 50 },
    activeSportTime: { type: Number, min: 0, max: 24, default: 1 },
    dailyNorma: { type: Number, default: 1500, min: 1000, max: 10000 },
    avatar: { type: String },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
