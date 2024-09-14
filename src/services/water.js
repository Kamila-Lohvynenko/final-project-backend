import { WaterCollection } from "../db/models/water.js";

export const addWater = async (userData) => {
    const waterRecord = await WaterCollection.create(userData);
    return waterRecord;
};

// export const addWater = async (userData) => {
//   try {
//     const waterRecord = new WaterCollection(userData);
//     const savedRecord = await waterRecord.save(); 
//     return savedRecord; 
//   } catch (error) {
//     throw new Error('Error creating water record');
//   }
// };

export const editWater = (id, userId, userData) => { 
    return WaterCollection.findOneAndUpdate(
   {_id: id, userId}, 
    userData,
   { new: true });
};

export const deleteWater = (id, userId) => { 
    return WaterCollection.findOneAndDelete({
    _id: id,
      userId,
    });
};

export const getWaterByDay = async (userId, day, month, year) => { 
  const records = await  WaterCollection.find({
      userId,
      day,
      month,
      year
    });
    const result = records.reduce((total, record) => total + record.amount, 0);
    return result;
};

export const getWaterByMonth = async (userId, month, year) => { 
    const records = await WaterCollection.find({
      userId,
      month,
      year
    });
    const result = records.reduce((total, record) => total + record.amount, 0);
    return result;
}; 