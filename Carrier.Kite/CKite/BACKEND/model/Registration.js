const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

// Schema for User Information
const registerSchema = new Schema({
  firstName: { type: String, required: true },       // First name of the user
  lastName: { type: String, required: true },        // Last name of the user
  email: { type: String, required: true, unique: true }, // Unique email
  phoneNumber: { type: String, required: true, unique: true }, // Unique phone number
  instituteName: { type: String, required: false },  // Institute name (optional)
  stream: { type: String, required: false },         // Stream or field of study (optional)
  password: { type: String, required: true },        // Hashed password
  enterPassword: { type: String, required: true }    // Entered password for confirmation (note: validate at application level)
});

// Apply pagination plugin
registerSchema.plugin(mongoosePaginate);

// Export the model
module.exports = mongoose.model('Registration', registerSchema);