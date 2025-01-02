const Java = require('../Models/TECHNICAL/javaquestions');
const JavaScript = require('../Models/TECHNICAL/javascrpitquestions');
const Python = require('../Models/Python');
const C = require('../Models/C');

const technicalController = {
  // 1. Create Bulk Questions
  createBulkQuestions: async (req, res) => {
    const { collection, questions } = req.body;

    // Validate input
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Bulk questions must be an array and cannot be empty" });
    }

    try {
      let Model;

      // Determine the model based on the collection name
      switch (collection) {
        case 'java':
          Model = Java;
          break;
        case 'javascript':
          Model = JavaScript;
          break;
        case 'python':
          Model = Python;
          break;
        case 'c':
          Model = C;
          break;
        default:
          return res.status(400).json({ message: 'Invalid collection name' });
      }

      // Insert questions into the database
      const createdQuestions = await Model.insertMany(questions, { ordered: true });

      // Send success response
      res.status(201).json({
        message: "Bulk questions created successfully",
        count: createdQuestions.length,
        createdQuestions,
      });
    } catch (error) {
      console.error("Error inserting questions:", error);

      // Check if validation errors exist
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.errors,
        });
      }

      // Send general error response
      res.status(500).json({
        message: "Error creating bulk questions",
        error: error.message,
      });
    }
  },

  // 2. Get All Questions from a Collection
  getAllQuestions: async (req, res) => {
    const { collection } = req.params;

    try {
      let Model;

      // Determine the model based on the collection name
      switch (collection) {
        case 'java':
          Model = Java;
          break;
        case 'javascript':
          Model = JavaScript;
          break;
        case 'python':
          Model = Python;
          break;
        case 'c':
          Model = C;
          break;
        default:
          return res.status(400).json({ message: 'Invalid collection name' });
      }

      // Fetch all questions from the database
      const questions = await Model.find();

      // Send success response
      res.status(200).json(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      res.status(500).json({ message: "Error fetching questions", error: error.message });
    }
  },

  // 3. Update a Question
  updateQuestion: async (req, res) => {
    const { collection, questionId } = req.params;
    const updatedData = req.body;

    try {
      let Model;

      // Determine the model based on the collection name
      switch (collection) {
        case 'java':
          Model = Java;
          break;
        case 'javascript':
          Model = JavaScript;
          break;
        case 'python':
          Model = Python;
          break;
        case 'c':
          Model = C;
          break;
        default:
          return res.status(400).json({ message: 'Invalid collection name' });
      }

      // Update the question in the database
      const updatedQuestion = await Model.findByIdAndUpdate(questionId, updatedData, { new: true });

      if (!updatedQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }

      // Send success response
      res.status(200).json({ message: "Question updated successfully", updatedQuestion });
    } catch (error) {
      console.error("Error updating question:", error);
      res.status(500).json({ message: "Error updating question", error: error.message });
    }
  },

  // 4. Delete a Question
  deleteQuestion: async (req, res) => {
    const { collection, questionId } = req.params;

    try {
      let Model;

      // Determine the model based on the collection name
      switch (collection) {
        case 'java':
          Model = Java;
          break;
        case 'javascript':
          Model = JavaScript;
          break;
        case 'python':
          Model = Python;
          break;
        case 'c':
          Model = C;
          break;
        default:
          return res.status(400).json({ message: 'Invalid collection name' });
      }

      // Delete the question from the database
      const deletedQuestion = await Model.findByIdAndDelete(questionId);

      if (!deletedQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }

      // Send success response
      res.status(200).json({ message: "Question deleted successfully", deletedQuestion });
    } catch (error) {
      console.error("Error deleting question:", error);
      res.status(500).json({ message: "Error deleting question", error: error.message });
    }
  },
};

module.exports = technicalController;
