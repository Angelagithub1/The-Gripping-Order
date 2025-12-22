import UserController from '../controllers/UserController.js';
import express from 'express';

const router = express.Router();
const userController = UserController();

router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.delete('/delete', userController.deleteUser);
router.get('/connectedUsers', userController.getUsserConnected);
router.post('/changeSkinAnia', userController.changeSkinAnia);
router.post('/changeSkinGancho', userController.changeSkinGancho);
export default router;