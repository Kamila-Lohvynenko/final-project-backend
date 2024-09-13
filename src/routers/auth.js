import express from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js'
import { getUserCurrentUserController, loginUserController, logoutUserController, refreshUserSessionController, registerUserController, updateDataUserController } from '../controllers/auth.js';
 import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();
const jsonParser = express.json();

router.post('/register', jsonParser, validateBody(registerUserSchema), ctrlWrapper(registerUserController) );

router.post('/login', jsonParser, validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.get('/data', authenticate, ctrlWrapper(getUserCurrentUserController));

router.patch('/updateData', jsonParser, authenticate, ctrlWrapper(updateDataUserController) );


export default router;
