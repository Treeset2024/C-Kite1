const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

// Schema for Group Discussion Videos
const groupDiscussionSchema = new Schema({
  title: { type: String, required: true },          // Title of the group discussion
  description: { type: String, required: true },   // Description of the discussion                 // Names of participants
  videoUrl: { type: String, required: true },       // URL of the stored video file (e.g., cloud storage URL)
  uploadedAt: { type: Date, default: Date.now },    // Timestamp of upload

});
groupDiscussionSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('GroupDiscussion', groupDiscussionSchema);
