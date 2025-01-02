const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const SoftwareQualitySchema = new mongoose.Schema({
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
  hint: String
  
});
 

  

SoftwareQualitySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('SoftwareQuality',SoftwareQualitySchema);