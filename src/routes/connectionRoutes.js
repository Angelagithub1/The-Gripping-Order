import express from 'express';
import createConnectionController from '../controllers/connectionController.js';

const router = express.Router();
const controllerConnection = createConnectionController();

router.get('/keepalive/:username', controllerConnection.checkConnection);
router.get('/userconnected/:username', controllerConnection.userConnected);
router.get('/users',controllerConnection.usersConnected)
export default router;