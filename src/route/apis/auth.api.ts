import express from 'express';
import authController from '../../controllers/auth.controller';
import token from '../../middlewares/token';
const router = express.Router();

router.get('/email-confirm/:token', token.validateToken, authController.confirmEmail);
router.get('/', token.validateToken, authController.authentication);

export default router;