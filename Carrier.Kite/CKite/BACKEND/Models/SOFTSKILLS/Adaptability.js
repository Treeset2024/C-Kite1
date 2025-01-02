const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose = require('mongoose');

const AdaptabilitySchema = new mongoose.Schema({
  question: String,
  hint: String,
  answerDescription: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Enable the pagination plugin
AdaptabilitySchema.plugin(mongoosePaginate);

const Adaptability = mongoose.model('Adaptability', AdaptabilitySchema);
module.exports = Adaptability;
