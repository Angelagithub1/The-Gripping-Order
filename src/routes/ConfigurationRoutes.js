import ConfigurationController from '../controllers/ConfigurationController.js';
import express from 'express';

const router = express.Router();
const configurationController = ConfigurationController();
router.post('/requestChangeScreen', configurationController.requestScreenChange);
router.get('/canChangeScreen', configurationController.shouldChangeScreen);
router.post('/setChangesCharacters', configurationController.selectCharacter);
router.post('/confirmChange',configurationController.confirmScreenChange);
router.post('/LimpiezaPorEliminacion',configurationController.cleanupOnDisconnect);
router.get('/choosen',configurationController.chosenCharacters);
router.get('/getCharacter/:username',configurationController.getSelectedCharacter)
export default router;