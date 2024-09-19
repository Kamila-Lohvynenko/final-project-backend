import Joi from 'joi';

export const waterRecordValidationSchema = Joi.object({
  amount: Joi.number().min(50).max(10000).required().messages({
    'number.min': 'The amount of water must be greater than 50 milliliters',
    'number.max': 'The amount of water must be less than or equal to 10000 milliliters',
    'any.required': 'The amount of water is a required field',
  }),
  day: Joi.string()
    .pattern(/^(0[1-9]|[12]\d|3[01])$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid day format (should be between 01 and 31)',
      'any.required': 'Day is required',
    }),
  month: Joi.string()
    .pattern(/^(0[1-9]|1[0-2])$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid month format (should be between 01 and 12)',
      'any.required': 'Month is required',
    }),
  year: Joi.string()
    .pattern(/^\d{4}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid year format (should be a four-digit number)',
      'any.required': 'Year is required',
    }),
  time: Joi.string()
    .pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid time format (should be hh:mm)',
      'any.required': 'Time is required',
    }),
});

export const querySchemaDay = Joi.object({
  day: Joi.string()
    .pattern(/^(0[1-9]|[12][0-9]|3[01])$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid day format (should be between 01 and 31)',
      'any.required': 'Day is required.',
    }),
  month: Joi.string()
    .pattern(/^(0[1-9]|1[0-2])$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid month format (should be between 01 and 12)',
      'any.required': 'Month is required.',
    }),
  year: Joi.string()
    .pattern(/^[0-9]{4}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid year format (should be a four-digit number)',
      'any.required': 'Year is required.',
    }),
});

export const querySchemaMonth = Joi.object({
  month: Joi.string()
    .pattern(/^(0[1-9]|1[0-2])$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid month format (should be between 01 and 12)',
      'any.required': 'Month is required.',
    }),
  year: Joi.string()
    .pattern(/^[0-9]{4}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid year format (should be a four-digit number)',
      'any.required': 'Year is required.',
    }),
});

export const updateWaterRecordValidationSchema = Joi.object({
  amount: Joi.number().min(50).max(10000),
  day: Joi.string().pattern(/^(0[1-9]|[12]\d|3[01])$/),
  month: Joi.string().pattern(/^(0[1-9]|1[0-2])$/),
  year: Joi.string().pattern(/^\d{4}$/),
  time: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/),
});
