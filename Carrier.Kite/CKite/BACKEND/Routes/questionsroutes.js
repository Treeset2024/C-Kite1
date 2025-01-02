const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
// Create a single question
//router.post('/questions', questionController.createQuestion);

// Create multiple questions in bulk
router.post('/createquestionsbulk', questionController.createBulkQuestions);

// Get all questions from a specific collection
router.get('/questions/:collection', questionController.getQuestions);

// Get a single question by ID
router.get('/questions/:collection/:id', questionController.getQuestionById);

// Update a question by ID
router.put('/questions/:collection/:id', questionController.updateQuestion);

// Delete a question by ID
router.delete('/questions/:collection/:id', questionController.deleteQuestion);


// Import the softskillsController




module.exports = router;



