import ConfigurationController from '../controllers/ConfigurationController.js';
import express from 'express';

const router = express.Router();
const configurationController = ConfigurationController();
router.post('/requestChangeScreen', configurationController.requestChangeScreen);
router.post('/canChangeScreen', configurationController.canChangeScreen);
router.post('/setChangesCharacters', configurationController.setChangesCharacters);
router.post('/resetParams', configurationController.resetParams);
router.post('/confirmChange',configurationController.confirmChange);
router.get('/choosen',configurationController.choosen);
export default router;