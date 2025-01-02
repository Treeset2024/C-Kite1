const { Logical, Numerical, Verbal } = require('../Models/questions');

// Utility function to get the appropriate model based on the collection
const getModelByCollection = (collection) => {
  switch (collection) {
    case 'logical':
      return Logical;
    case 'numerical':
      return Numerical;
    case 'verbal':
      return Verbal;
    default:
      return null;
  }
};

const questionController = {
  // Create multiple questions in a specific collection
  createBulkQuestions: async (req, res) => {
    const { collection, questions } = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Bulk questions must be an array and cannot be empty" });
    }

    try {doi
      const Model = getModelByCollection(collection);
      if (!Model) {
        return res.status(400).json({ message: "Invalid collection" });
      }

      const createdQuestions = await Model.insertMany(questions, { ordered: false });
      res.status(201).json({ message: "Bulk questions created successfully", createdQuestions });
    } catch (error) {
      if (error.writeErrors) {
        const failedInserts = error.writeErrors.map((err) => ({
          id: err.err.op.id,
          message: err.err.errmsg,
        }));
        return res.status(400).json({
          message: "Some questions failed to insert due to duplicate keys",
          failedInserts,
        });
      }

      res.status(500).json({ message: "Error creating bulk questions", error });
    }
  },

  // Get all questions from a specific collection
  getQuestions: async (req, res) => {
    const { collection } = req.params;

    try {
      const Model = getModelByCollection(collection);
      if (!Model) {
        return res.status(400).json({ message: "Invalid collection" });
      }

      const questions = await Model.find();
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching questions", error });
    }
  },

  // Get a single question by ID from a specific collection
  getQuestionById: async (req, res) => {
    const { collection, id } = req.params;

    try {
      const Model = getModelByCollection(collection);
      if (!Model) {
        return res.status(400).json({ message: "Invalid collection" });
      }

      const question = await Model.findOne({ id });
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }

      res.status(200).json(question);
    } catch (error) {
      res.status(500).json({ message: "Error fetching question", error });
    }
  },

  // Update a question by ID
  updateQuestion: async (req, res) => {
    const { collection, id } = req.params;
    const { question, options, answerDescription, hint } = req.body;

    try {
      const Model = getModelByCollection(collection);
      if (!Model) {
        return res.status(400).json({ message: "Invalid collection" });
      }

      const updatedQuestion = await Model.findOneAndUpdate(
        { id },
        { question, options, answerDescription, hint },
        { new: true, runValidators: true }
      );

      if (!updatedQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }

      res.status(200).json({ message: "Question updated successfully", updatedQuestion });
    } catch (error) {
      res.status(500).json({ message: "Error updating question", error });
    }
  },

  // Delete a question by ID
  deleteQuestion: async (req, res) => {
    const { collection, id } = req.params;

    try {
      const Model = getModelByCollection(collection);
      if (!Model) {
        return res.status(400).json({ message: "Invalid collection" });
      }

      const deletedQuestion = await Model.findOneAndDelete({ id });
      if (!deletedQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }

      res.status(200).json({ message: "Question deleted successfully", deletedQuestion });
    } catch (error) {
      res.status(500).json({ message: "Error deleting question", error });
    }
  },
};

module.exports = questionController;
