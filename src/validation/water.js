import Joi from 'joi';

export const waterRecordValidationSchema = Joi.object({
  amount: Joi.number().min(0.05).required().messages({
    'number.base': 'The amount of water must be a number',
    'number.min': 'The amount of water must be greater than 50 ml',
    'any.required': 'The amount of water is a required field',
  }),
  
  time: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required().messages({
    'string.pattern.base': 'Time must be in hh:mm format',
    'any.required': 'Time is a required field',
  }),
        
  date: Joi.string().required().messages({
    'date.base': 'Invalid date format',
    'any.required': 'Date is a required field',
  }),
      
  dailyWaterRate: Joi.number().min(1).max(10).required().messages({
    'number.base': 'The amount of water should be a number',
    'number.min': 'The amount of water should be greater than 1 liter',
    'number.max': 'The amount of water should be no more than 10 liters',
    'any.required': 'The amount of water is a required field',
  }),

});

export const updateWaterRecordValidationSchema = Joi.object({
  amount: Joi.number().min(0.05),
  time: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/),
  date: Joi.string(),
  dailyWaterRate: Joi.number().min(1).max(10),
});