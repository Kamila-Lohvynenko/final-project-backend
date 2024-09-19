import express from 'express';

import {
  waterRecordValidationSchema,
  updateWaterRecordValidationSchema,
  querySchemaDay,
  querySchemaMonth,
} from '../validation/water.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  addWaterController,
  editWaterController,
  deleteWaterController,
  getWaterByDayController,
  getWaterByMonthController,
} from '../controllers/water.js';
import { authenticate } from '../middlewares/authenticate.js';
const router = express.Router();
const jsonParser = express.json();

router.use(authenticate);

router.post(
  '/',
  validateBody(waterRecordValidationSchema),
  jsonParser,
  ctrlWrapper(addWaterController),
);

router.patch(
  '/:id',
  isValidId('id'),
  jsonParser,
  validateBody(updateWaterRecordValidationSchema),
  ctrlWrapper(editWaterController),
);

router.delete('/:id', isValidId('id'), ctrlWrapper(deleteWaterController));

router.get('/day', jsonParser, validateBody(querySchemaDay), ctrlWrapper(getWaterByDayController));

router.get('/month', jsonParser, validateBody(querySchemaMonth), ctrlWrapper(getWaterByMonthController));

export default router;
