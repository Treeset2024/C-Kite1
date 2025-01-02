/*const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  college: { type: String, required: true },
  branch: { type: String, required: true },
  results: [
    {
      module: String,
      submodule: String,
      score: Number,
      total: Number,
    },
  ],
});

module.exports = mongoose.model('user', UserSchema);*/
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
 
    firstName: { type: String },
    lastName: { type: String },
  
  email: { type: String, required: true, unique: true },
  college: { type: String, required: true },
  branch: { type: String, required: true },
  phonenumber:{type:String,required:true},
  results: [
    {
      module: String,
      submodule: String,
      score: Number,
      total: Number,
    },
  ],
});
module.exports = mongoose.model('user', UserSchema);
