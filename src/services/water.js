import { UsersCollection } from '../db/models/user.js';
import { WaterCollection } from '../db/models/water.js';

export const addWater = async (userId, amount, day, month, year, time) => {
  const [hour, minute] = time.split(':').map(Number);

  if (
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59 ||
    isNaN(hour) ||
    isNaN(minute)
  ) {
    throw new Error(
      'Invalid time format. Use "HH:mm", where hours must be between 0-23 and minutes between 0-59',
    );
  }
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const inputDate = new Date(year, month - 1, day, hour, minute);
  inputDate.setHours(0, 0, 0, 0);

  if (inputDate.toDateString() !== currentDate.toDateString()) {
    throw new Error("You can only add water for today's date");
  }
  const waterRecord = await WaterCollection.create({
    userId,
    amount,
    day,
    month,
    year,
    time,
  });
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
