import express from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { confirmOAuthSchema, loginUserSchema, registerUserSchema, requestResetEmailSchema, resetPasswordSchema, updateDataUserSchema } from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js'
import { getUserCurrentUserController, loginUserController, logoutUserController, refreshUserSessionController, registerUserController, updateDataUserController } from '../controllers/auth.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { requestResetEmailController, resetPasswordComtroller } from '../controllers/reset-password.js';
import { confirmOAuthController, getOAuthUrlController } from '../controllers/google-o-auth.js';

const router = express.Router();
const jsonParser = express.json();

router.post('/register', jsonParser, validateBody(registerUserSchema), ctrlWrapper(registerUserController) );

router.post('/login', jsonParser, validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.get('/data', authenticate, ctrlWrapper(getUserCurrentUserController));

router.patch('/userId', jsonParser, authenticate, validateBody(updateDataUserSchema), ctrlWrapper(updateDataUserController));

router.patch('/avatar', authenticate, upload.single('avatar'), ctrlWrapper(updateDataUserController));

router.post('/send-reset-email', jsonParser, validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));

router.post('/reset-pwd', jsonParser, validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordComtroller));

router.get('/get-oauth-url', ctrlWrapper(getOAuthUrlController));

router.post('/confirm-oauth', jsonParser, validateBody(confirmOAuthSchema), ctrlWrapper(confirmOAuthController));


export default router;
