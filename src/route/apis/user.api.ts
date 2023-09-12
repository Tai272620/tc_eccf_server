import express from 'express';
const router = express.Router();
import userController from '../../controllers/user.controller';
import register from '../../middlewares/register';

router.post('/', register.validateRegistrationData, userController.register);
router.post('/login', userController.login);

export default router;