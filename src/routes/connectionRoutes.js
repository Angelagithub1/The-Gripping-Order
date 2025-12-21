import express from 'express';
import createConnectionController from '../controllers/connectionController.js';

const router = express.Router();
const controller = createConnectionController();

router.get('/', controller.checkConnection);

export default router;