const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');


// Schema for Logical Questions

// Schema for Numerical Questions
const numericalQuestionSchema = new Schema({
  id: { type: String, required: true, unique: true },
  question: { type: String, required: true },
  options: [
    {
      id: { type: String, required: true },
      text: { type: String, required: true },
      isCorrect: { type: Boolean, required: true }
    }
  ],
  answerDescription: String,
  hint: String,
   // Optional field for video link
});
numericalQuestionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Numerical', numericalQuestionSchema);