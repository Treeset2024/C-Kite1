const express = require('express');
const router = express.Router();
const technicalController = require('../controllers/technicalController');
// Create a single question
//router.post('/questions', questionController.createQuestion);

// Create multiple questions in bulk
router.post('/createquestionsbulk', technicalController.createBulkQuestions);

// Get all questions from a specific collection
router.get('/questions/:collection', technicalController.getAllQuestions);

// Get a single question by ID
router.get('/questions/:collection/:id', technicalController.getQuestionById);

// Update a question by ID
router.put('/questions/:collection/:id', technicalController.updateQuestion);

// Delete a question by ID
router.delete('/questions/:collection/:id', technicalController.deleteQuestion);


// Import the softskillsController




module.exports = router;



