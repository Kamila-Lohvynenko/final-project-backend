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
      
          const addedWater = await addWater(userData);
      
          if (!addedWater) {
            return res.status(400).json({
              status: 400,
              message: 'Failed to add water record',
            });
          }
      
          res.status(201).json({
            status: 201,
            message: 'Successfully added water!',
            data: addedWater,
          }); 
        } catch (error) {
          console.error('Error adding water record:', error);
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
    res.status(204).send();
};

export const getWaterByDayController = async (req, res, next) => {
 const userId = req.user._id;
 const { date } = req.query;

 if (!date) {
    throw (createHttpError(404, 'Date is required!'));
  }
  const result = await getWaterByDay(userId, date); 

 res.status(200).json({
  status: 200,
  message: 'Successfully update the water!',
  data: result,
 });
};

export const getWaterByMonthController = async (req, res, next) => {
 const userId = req.user._id;
 const { month } = req.query;

 if (!month) {
    throw (createHttpError(404, 'Month is required!'));
  }

  const result = await getWaterByMonth( userId, month); 

  res.status(200).json({
    status: 200,
    message: 'Successfully update the water!',
    data: result,
   });
};