/*const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;
const ResultSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  module: { type: String, required: true },
  submodule: { type: mongoose.Schema.Types.ObjectId, ref: 'PredefinedSubmodule', required: true },
  score: { type: Number, required: true },
});
ResultSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Result', ResultSchema);*/
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;

const ResultSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  module: { type: String, required: true },
  submodule: { type: String, required: true }, // Store submoduleName as string
  score: { type: Number, required: true },
});

ResultSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Result', ResultSchema);

