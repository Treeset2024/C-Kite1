// routes/index.js
const express = require('express');
const { createGenericRouter } = require('../controllers/GenricController');
const router = express.Router();

// Import all models
const Adaptability = require('../Models/SOFTSKILLS/Adaptability');
const CommunicationSkills = require('../Models/SOFTSKILLS/CommunicationSkills');
const CriticalThinking = require('../Models/SOFTSKILLS/CriticalThinking');
const EmotionalIntelligence = require('../Models/SOFTSKILLS/EmotionalIntelligence');
const Leadership = require('../Models/SOFTSKILLS/Leadership');
const Logical = require('../Models/APTITUDE/LogicalQuestions');
const Numerical = require('../Models/APTITUDE/Numerical');
const ProblemSolving = require('../Models/SOFTSKILLS/ProblemSolving');
const TimeManagement = require('../Models/SOFTSKILLS/TimeManagement');
const Teamwork = require('../Models/SOFTSKILLS/TeamWork');
const VerbalQuestions = require('../Models/APTITUDE/VerbalQuestions');
const WorkEthics = require('../Models/SOFTSKILLS/WorkEthics');
const Creativity = require('../Models/SOFTSKILLS/Creativity');
const conflict=require('../Models/SOFTSKILLS/conflict');
const JavaScript=require('../Models/TECHNICAL/javascrpitquestions');
const JavaQuestions=require('../Models/TECHNICAL/javaquestions');
const Python=require('../Models/TECHNICAL/Python');
const C=require('../Models/TECHNICAL/C');
const Software=require('../Models/INDUSTRYEXPERTISE/Software');
const Agile=require('../Models/INDUSTRYEXPERTISE/Agile');
const ProjectManagement=require('../Models/INDUSTRYEXPERTISE/ProjectManagement');
const SoftwareQuality=require('../Models/INDUSTRYEXPERTISE/SoftwareQuality');
//const user=require('../model/user');
//const results=require('../model/results');
//const Registration=require('../model/Registration');
//const GroupDiscussion = require('../Models/GROUPDISCUSSION/gd');






// Create routes for each model
router.use(createGenericRouter(Adaptability, 'Adaptability-Flexibility'));
router.use(createGenericRouter(CommunicationSkills, 'Communication-Skills'));
router.use(createGenericRouter(CriticalThinking, 'Critical-Thinking'));
router.use(createGenericRouter(EmotionalIntelligence, 'Emotional-Intelligence'));
router.use(createGenericRouter(Leadership, 'Leadership'));
router.use(createGenericRouter(Logical, 'Logical'));
router.use(createGenericRouter(Numerical, 'Quantitative-Aptitude'));
router.use(createGenericRouter(ProblemSolving, 'Problem-Solving'));
router.use(createGenericRouter(TimeManagement, 'Time-Management'));
router.use(createGenericRouter(Teamwork, 'Teamwork-Collaboration'));
router.use(createGenericRouter(VerbalQuestions, 'Verbal'));
router.use(createGenericRouter(WorkEthics, 'Work-Ethics'));
router.use(createGenericRouter(Creativity, 'Creativity'));
router.use(createGenericRouter(conflict, 'Conflict-Management'));
router.use(createGenericRouter(JavaScript, 'Javascrpit'));
router.use(createGenericRouter(JavaQuestions, 'Java'));
router.use(createGenericRouter(Python, 'Python'));
router.use(createGenericRouter(C, 'C-Programming'));
router.use(createGenericRouter(Software, 'Software-Engineering'));
router.use(createGenericRouter(Agile,'Agile-Methodology'));
router.use(createGenericRouter(ProjectManagement,'Project-Management'));
router.use(createGenericRouter(SoftwareQuality,'Quality-Engineering'));
//router.use(createGenericRouter(user,'User'));
//router.use(createGenericRouter(results,'Results'));
//router.use(createGenericRouter(Registration,'Registration'));
//router.use(createGenericRouter(GroupDiscussion,'group-discussion'));


/*router.get('/softskills/random', async (req, res) => {
  try {
    const softSkillsCollections = [
      Adaptability,
      CommunicationSkills,
      CriticalThinking,
      EmotionalIntelligence,
      Leadership,
      ProblemSolving,
      TimeManagement,
      Teamwork,
      WorkEthics,
      Creativity,
      conflict,
    ];

    const randomQuestions = [];

    for (const Model of softSkillsCollections) {
      const randomDocs = await Model.aggregate([{ $sample: { size: 5 } }]); // Sample size per model
      randomQuestions.push(...randomDocs);
    }

    const shuffledQuestions = randomQuestions.sort(() => Math.random() - 0.5);

    res.json({
      totalQuestions: shuffledQuestions.length,
      questions: shuffledQuestions,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching random soft skills questions',
      error: error.message,
    });
  }
});*/








/*router.get('/softskills/random', async (req, res) => {
  try {
    const softSkillsCollections = [
      Adaptability,
      CommunicationSkills,
      CriticalThinking,
      EmotionalIntelligence,
      Leadership,
      ProblemSolving,
      TimeManagement,
      Teamwork,
      WorkEthics,
    ];

    const randomQuestions = [];

    for (const Model of softSkillsCollections) {
      const randomDocs = await Model.aggregate([{ $sample: { size: 5 } }]); // Sample size per model
      randomQuestions.push(...randomDocs);
    }

    const shuffledQuestions = randomQuestions.sort(() => Math.random() - 0.5);

    res.json({
      totalQuestions: shuffledQuestions.length,
      questions: shuffledQuestions,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching random soft skills questions',
      error: error.message,
    });
  }
});*/





module.exports = router;
/*const express = require('express');
const { createGenericRouter } = require('../controllers/GenricController');

// Import all models
const Adaptability = require('../Models/SOFTSKILLS/Adaptability');
const CommunicationSkills = require('../Models/SOFTSKILLS/CommunicationSkills');
const CriticalThinking = require('../Models/SOFTSKILLS/CriticalThinking');
const EmotionalIntelligence = require('../Models/SOFTSKILLS/EmotionalIntelligence');
const Leadership = require('../Models/SOFTSKILLS/Leadership');
const ProblemSolving = require('../Models/SOFTSKILLS/ProblemSolving');
const TimeManagement = require('../Models/SOFTSKILLS/TimeManagement');
const Teamwork = require('../Models/SOFTSKILLS/TeamWork');
const WorkEthics = require('../Models/SOFTSKILLS/WorkEthics');
const LogicalQuestions = require('../Models/APTITUDE/LogicalQuestions');
const Numerical = require('../Models/APTITUDE/Numerical');
const VerbalQuestions = require('../Models/APTITUDE/VerbalQuestions');



const router = express.Router();*/

// Add routes for soft skills collections
/*router.get('/softskills/random', async (req, res) => {
  try {
    const softSkillsCollections = [
      Adaptability,
      CommunicationSkills,
      CriticalThinking,
      EmotionalIntelligence,
      Leadership,
      ProblemSolving,
      TimeManagement,
      Teamwork,
      WorkEthics,
    ];

    const randomQuestions = [];

    for (const Model of softSkillsCollections) {
      const randomDocs = await Model.aggregate([{ $sample: { size: 5 } }]); // Sample size per model
      randomQuestions.push(...randomDocs);
    }

    const shuffledQuestions = randomQuestions.sort(() => Math.random() - 0.5);

    res.json({
      totalQuestions: shuffledQuestions.length,
      questions: shuffledQuestions,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching random soft skills questions',
      error: error.message,
    });
  }
});

// Generic routes for all models
router.use(createGenericRouter(Adaptability, 'adaptability'));
router.use(createGenericRouter(CommunicationSkills, 'communication-skills'));
router.use(createGenericRouter(CriticalThinking, 'critical-thinking'));
router.use(createGenericRouter(EmotionalIntelligence, 'emotional-intelligence'));
router.use(createGenericRouter(Leadership, 'leadership'));
router.use(createGenericRouter(ProblemSolving, 'problem-solving'));
router.use(createGenericRouter(TimeManagement, 'time-management'));
router.use(createGenericRouter(Teamwork, 'teamwork'));
router.use(createGenericRouter(WorkEthics, 'work-ethics'));
router.use(createGenericRouter(LogicalQuestions, 'logical-questions'));
router.use(createGenericRouter(Numerical, 'numerical-questions'));
router.use(createGenericRouter(VerbalQuestions, 'verbal-questions'));

module.exports = router;*/
