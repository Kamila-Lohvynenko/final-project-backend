import 'dotenv/config';
import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  const accesLink = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority&appName=mongodb`;

  try {
    mongoose.connect(accesLink);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error(error);
    throw error;
  }
};
