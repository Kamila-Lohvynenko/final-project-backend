import createHttpError from 'http-errors';
import {
  addWater,
  deleteWater,
  editWater,
  getWaterByDay,
  getWaterByMonth,
} from '../services/water.js';

export const addWaterController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { amount, day, month, year, time } = req.body;

    if (!amount || !day || !month || !year || !time) {
      throw new Error('All fields are required');
    }

    const addedWater = await addWater(userId, amount, day, month, year, time);

    res.status(201).json({
      status: 201,
      message: 'Successfully added water!',
      data: addedWater,
    });
  } catch (error) {

    res.status(400).json({
      status: 400,
      message: error.message 
    });
  }
};

export const editWaterController = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  const result = await editWater(id, userId, { ...req.body });

  if (result === null) {
    next(createHttpError(404, 'Not found to update'));
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated the water!',
    data: result,
  });
};

export const deleteWaterController = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  const deletedWater = await deleteWater(id, userId);

  if (!deletedWater) {
    next(createHttpError(404, 'Water not found!'));
  }
  res.status(204).send();
};

export const getWaterByDayController = async (req, res) => {
  const userId = req.user._id;

  const { day, month, year } = req.body;

  if (!day || !month || !year) {
    throw createHttpError(404, 'Day, month, and year are required!');
  }

  const data = await getWaterByDay(userId, day, month, year);

  res.status(200).json({
    status: 200,
    message: 'Successfully fetched the water consumption data!',
    resultData: {
      records: data.records,        
      totalWater: data.totalWater,  
      dailyNorma: data.dailyNorma,  
      percentage: data.percentage,  
    },
  });
};

export const getWaterByMonthController = async (req, res) => {
  const userId = req.user._id;
  const { month, year } = req.body;

  if (!month || !year) {
   
    throw createHttpError(404, 'Month and year are required!');
  }

  const result = await getWaterByMonth(userId, month, year);

  res.status(200).json({
    status: 200,
    message: 'Successfully update the water!',
    data: result,
  });
};
