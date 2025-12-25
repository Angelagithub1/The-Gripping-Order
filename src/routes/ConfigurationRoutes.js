import ConfigurationController from '../controllers/ConfigurationController.js';
import express from 'express';

const router = express.Router();
const configurationController = ConfigurationController();
router.post('/requestChangeScreen', configurationController.requestChangeScreen);
router.get('/canChangeScreen', configurationController.canChangeScreen);
router.post('/setChangesCharacters', configurationController.setChangesCharacters);
router.post('/confirmChange',configurationController.confirmChange);
router.post('/LimpiezaPorEliminacion',configurationController.LimpiezaPorEliminacion);
router.get('/choosen',configurationController.choosen);
router.get('/getCharacter/:username',configurationController.getCharacter)
export default router;