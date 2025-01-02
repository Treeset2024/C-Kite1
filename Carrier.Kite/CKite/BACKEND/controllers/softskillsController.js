const CommunicationSkills = require('../Models/CommunicationSkills');
const Teamwork = require('../Models/Teamwork');
const TimeManagement = require('../Models/TimeManagement');
const Adaptability = require('../Models/Adaptability');
const Leadership = require('../Models/Leadership');
const ProblemSolving = require('../Models/ProblemSolving');
const CriticalThinking = require('../Models/CriticalThinking');
const WorkEthics = require('../Models/WorkEthics');
const EmotionalIntelligence = require('../Models/EmotionalIntelligence');
const Creativity = require('../Models/Creativity');
const conflict=require('../Models/conflict');

const softskillsController = {

  // 1. Create Bulk Questions
  createBulkQuestions: async (req, res) => {
    const { collection, questions } = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Bulk questions must be an array and cannot be empty" });
    }

    try {
      let Model;
      switch (collection) {
        case 'communicationSkills':
          Model = CommunicationSkills;
          break;
        case 'teamworkAndCollaboration':
          Model = Teamwork;
          break;
        case 'timeManagement':
          Model = TimeManagement;
          break;
        case 'adaptability':
          Model = Adaptability;
          break;
        case 'leadership':
          Model = Leadership;
          break;
        case 'problemSolving':
          Model = ProblemSolving;
          break;
        case 'criticalThinking':
          Model = CriticalThinking;
          break;
        case 'workEthics':
          Model = WorkEthics;
          break;
        case 'emotionalIntelligence':
          Model = EmotionalIntelligence;
          break;
        case 'creativity':
          Model = Creativity;
        case 'conflict':
          Model = conflict;
        default:
          return res.status(400).json({ message: 'Invalid collection' });
      }

      const createdQuestions = await Model.insertMany(questions, { ordered: false });
      res.status(201).json({ message: "Bulk questions created successfully", createdQuestions });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating bulk questions", error });
    }
  },

  // 2. Get All Questions from a Collection
  getAllQuestions: async (req, res) => {
    const { collection } = req.params;

    try {
      let Model;
      switch (collection) {
        case 'communicationSkills':
          Model = CommunicationSkills;
          break;
        case 'teamworkAndCollaboration':
          Model = Teamwork;
          break;
        case 'timeManagement':
          Model = TimeManagement;
          break;
        case 'adaptability':
          Model = Adaptability;
          break;
        case 'leadership':
          Model = Leadership;
          break;
        case 'problemSolving':
          Model = ProblemSolving;
          break;
        case 'criticalThinking':
          Model = CriticalThinking;
          break;
        case 'workEthics':
          Model = WorkEthics;
          break;
        case 'emotionalIntelligence':
          Model = EmotionalIntelligence;
          break;
        case 'creativity':
          Model = Creativity;
        case 'conflict':
          Model = conflict;
        default:
          return res.status(400).json({ message: 'Invalid collection' });
      }

      const questions = await Model.find();
      res.status(200).json(questions);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching questions", error });
    }
  },

  // 3. Update a Question
  updateQuestion: async (req, res) => {
    const { collection, questionId } = req.params;
    const updatedData = req.body;

    try {
      let Model;
      switch (collection) {
        case 'communicationSkills':
          Model = CommunicationSkills;
          break;
        case 'teamworkAndCollaboration':
          Model = Teamwork;
          break;
        case 'timeManagement':
          Model = TimeManagement;
          break;
        case 'adaptability':
          Model = Adaptability;
          break;
        case 'leadership':
          Model = Leadership;
          break;
        case 'problemSolving':
          Model = ProblemSolving;
          break;
        case 'criticalThinking':
          Model = CriticalThinking;
          break;
        case 'workEthics':
          Model = WorkEthics;
          break;
        case 'emotionalIntelligence':
          Model = EmotionalIntelligence;
          break;
        case 'creativity':
          Model = Creativity;
        case 'conflict':
          Model = conflict;
        default:
          return res.status(400).json({ message: 'Invalid collection' });
      }

      const updatedQuestion = await Model.findByIdAndUpdate(questionId, updatedData, { new: true });
      if (!updatedQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }

      res.status(200).json({ message: "Question updated successfully", updatedQuestion });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating question", error });
    }
  },

  // 4. Delete a Question
  deleteQuestion: async (req, res) => {
    const { collection, questionId } = req.params;

    try {
      let Model;
      switch (collection) {
        case 'communicationSkills':
          Model = CommunicationSkills;
          break;
        case 'teamworkAndCollaboration':
          Model = Teamwork;
          break;
        case 'timeManagement':
          Model = TimeManagement;
          break;
        case 'adaptability':
          Model = Adaptability;
          break;
        case 'leadership':
          Model = Leadership;
          break;
        case 'problemSolving':
          Model = ProblemSolving;
          break;
        case 'criticalThinking':
          Model = CriticalThinking;
          break;
        case 'workEthics':
          Model = WorkEthics;
          break;
        case 'emotionalIntelligence':
          Model = EmotionalIntelligence;
          break;
        case 'creativity':
          Model = Creativity; 
        case 'conflict':
          Model = conflict; 
        default:
          return res.status(400).json({ message: 'Invalid collection' });
      }

      const deletedQuestion = await Model.findByIdAndDelete(questionId);
      if (!deletedQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }

      res.status(200).json({ message: "Question deleted successfully", deletedQuestion });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting question", error });
    }
  },
};

module.exports = softskillsController;