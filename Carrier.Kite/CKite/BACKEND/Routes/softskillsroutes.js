const express = require('express');
const router = express.Router();
const softskillsController = require('../controllers/softskillsController');

// Route for creating bulk questions in a specific collection

router.post('/questions/:collection/bulk', softskillsController.createBulkQuestions);

// Route for getting all questions from a specific collection
router.get('/questions/:collection', softskillsController.getQuestions);

// Route for getting a single question by ID from a specific collection
router.get('/questions/:collection/:id', softskillsController.getQuestionById);

// Route for updating a question by ID in a specific collection
router.put('/questions/:collection/:id', softskillsController.updateQuestion);

// Route for deleting a question by ID from a specific collection
router.delete('/questions/:collection/:id', softskillsController.deleteQuestion);
module.exports = router;