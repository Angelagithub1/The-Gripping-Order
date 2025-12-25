import UserController from '../controllers/UserController.js';
import express from 'express';

const router = express.Router();
const userController = UserController();

router.get('/login/:username/:password', userController.loginUser);
router.post('/register', userController.registerUser);
router.delete('/delete', userController.deleteUser);
router.put('/changeSkinAnia/:username', userController.changeSkinAnia);
router.put('/changeSkinGancho/:username', userController.changeSkinGancho);
router.get('/getSkins/:username',userController.getSkins)
router.get('/AllPlayersSkins',userController.AllPlayersSkins)
export default router;