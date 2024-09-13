import createHttpError from "http-errors";
import { addWater,
     deleteWater,
     editWater, 
     getWaterByDay,
     getWaterByMonth} from "../services/water.js";

export const addWaterController = async (req, res, next) => {
    try {

        const userId = req.user._id;
        const userData = { ...req.body, userId}; 
        // console.log('Received data:', userData); 
        const addedWater = await addWater(userData);
        // console.log('Added water record:', addedWater);
        res.status(201).json({
            status: 201,
            message: 'Successfully added water!',
            data: addedWater,
        }); 
    } catch (error) {
        next(error);
    }
};

export const editWaterController = async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user._id; 

    const result = await editWater(id, userId, {...req.body}); 

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
        next (createHttpError(404, 'Water not found!'));
    }
    res.status(204).end();
};

export const getWaterByDayController = async (req, res, next) => {
 const userId = req.user._id;
 const { date } = req.query;

 if (!date) {
    next (createHttpError(404, 'Date is required!'));
  }
  const totalWater = await getWaterByDay(userId, date); 
  res.status(200).json({ totalWater });
};

export const getWaterByMonthController = async (req, res, next) => {
 const userId = req.user._id;
 const { date } = req.query;

 if (!date) {
    throw (createHttpError(404, 'Month is required!'));
  }
//   const monthDate = new Date(date);

  const totalWater = await getWaterByMonth( userId, date); 

  if (!totalWater.length) {
    throw createHttpError(404, 'No data found for this month');
  }
  res.json({ totalWater });
};