const express = require('express');
const router = express.Router();
const industrycontroller = require('../controllers/industrycontroller');
// Create a single question
//router.post('/questions', questionController.createQuestion);

// Create multiple questions in bulk
router.post('/createquestionsbulk', industrycontroller.createBulkQuestions);

// Get all questions from a specific collection
router.get('/questions/:collection', industrycontroller.getAllQuestions);

// Get a single question by ID
router.get('/questions/:collection/:id', industrycontroller.getQuestionById);

// Update a question by ID
router.put('/questions/:collection/:id', industrycontroller.updateQuestion);

// Delete a question by ID
router.delete('/questions/:collection/:id', industrycontroller.deleteQuestion);


// Import the softskillsController




module.exports = router;



