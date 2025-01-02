const express = require('express');
const router = express.Router();
const resultController = require('../Controller/resultcontroller');

router.post('/results', resultController.createResult);
router.get('/result', resultController.getResults);
router.get('/results/:id', resultController.getResultById);
router.put('/results/:id', resultController.updateResult);
router.delete('/results/:id', resultController.deleteResult);

module.exports = router;
