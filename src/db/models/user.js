
import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    name: {type: String, default: 'User'},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['woman', 'man'], default: 'woman' },
    weight: { type: Number },
    activeSportTime: {type: Number},
    dailyNorma: { type: Number, default: 1.5 },
    avatar: {type: String},
  },
  { timestamps: true, versionKey: false },
);


usersSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export const UsersCollection = model('users', usersSchema);
