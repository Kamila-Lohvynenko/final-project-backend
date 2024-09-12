import { WaterCollection } from "../db/models/water.js";

export const addWater = async (userData) => {
  console.log('Creating water record with data:', userData);
    const waterRecord = await WaterCollection.create(userData);
    console.log('Created water record:', waterRecord);
    return waterRecord;
};

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

export const getWaterByDay = async (userId, date) => { 
  const records = await  WaterCollection.find({
    userId,
    date,
    });
    const totalWater = records.reduce((total, record) => total + record.amount, 0);
    return totalWater;
};

export const getWaterByMonth = async (userId, date) => { 
   
  // const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  // const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);

    const records = await WaterCollection.find({
      userId,
      date
    });
    console.log("recyords", records);
    
    const totalWater = records.reduce((total, record) => total + record.amount, 0);
    return totalWater;
};