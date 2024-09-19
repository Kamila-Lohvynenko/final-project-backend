import { UsersCollection } from '../db/models/user.js';
import { WaterCollection } from '../db/models/water.js';

export const addWater = async (userData) => {
  const waterRecord = await WaterCollection.create(userData);
  return waterRecord;
};

export const editWater = (id, userId, userData) => {
  return WaterCollection.findOneAndUpdate({ _id: id, userId }, userData, {
    new: true,
  });
};

export const deleteWater = (id, userId) => {
  return WaterCollection.findOneAndDelete({
    _id: id,
    userId,
  });
};

export const getWaterByDay = async (userId, day, month, year) => {
  const records = await WaterCollection.find({
    userId,
    day,
    month,
    year,
  });
  const totalWater = records.reduce((sum, record) => sum + record.amount, 0);

  const user = await UsersCollection.findById(userId);

  if (!user) {
    throw new Error(404, 'User not found');
  }

  const dailyNorma = user.dailyNorma;
  const percentage = Math.round((totalWater / dailyNorma) * 100);

  return {
    records,
    totalWater,
    dailyNorma,
    percentage: `${percentage}%`,
  };
};

export const getWaterByMonth = async (userId, month, year) => {
  const records = await WaterCollection.find({
    userId,
    month,
    year,
  });
  return records;
};
