
import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    name: {type: String, default: 'User'},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['woman', 'man'], default: 'woman' },
    weight: { type: Number ,  min: 0, max:500,},
    activeSportTime: {type: Number, min: 1, max:24},
    dailyNorma: { type: Number, default: 1.5, min:1, max:10 },
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
