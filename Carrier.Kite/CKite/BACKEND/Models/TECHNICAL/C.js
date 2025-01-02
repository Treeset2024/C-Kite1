const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const CQuestionsSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Unique identifier for each question
  question: { type: String, required: true }, // Main question text
  options: [
    {
      id: { type: String, required: true }, // Unique ID for the option
      text: { type: String, required: true }, // Text of the option
      isCorrect: { type: Boolean, required: true }, // Whether this option is correct
    },
  ],
 
  answerDescription: { type: String, default: null }, // Optional explanation for the correct answer
  hint: { type: String, default: null }, // Optional hint for the question
});

// Apply pagination plugin
CQuestionsSchema.plugin(mongoosePaginate);

// Export the model
module.exports = mongoose.model('C', CQuestionsSchema);
