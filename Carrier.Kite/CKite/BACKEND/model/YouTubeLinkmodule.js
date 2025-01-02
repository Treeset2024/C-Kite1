/*const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;

const predefinedSubmoduleSchema = new Schema({
     // Name of the submodule
  youtubeLink: { type: String, required: true },      // YouTube link for the submodule
     // Optional description of the submodule
});
predefinedSubmoduleSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('PredefinedSubmodule', predefinedSubmoduleSchema);*/

/*const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;

const predefinedSubmoduleSchema = new Schema({
  youtubeLink: { type: String, required: true }, // YouTube link for the submodule
});

predefinedSubmoduleSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('PredefinedSubmodule', predefinedSubmoduleSchema);*/

/*const mongoose = require('mongoose');

const youtubeLinkSchema = new mongoose.Schema({
  moduleName: { type: String, required: true },
  submoduleName: { type: String ,requried: true}, 
  videos: [
    {
      videoURL: { type: String, required: true },
      description: { type: String }, // Optional description
      order: { type: Number, default: 0 }, // Optional: To order videos
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('YouTubeLink', youtubeLinkSchema);
*/
const mongoose = require('mongoose');
const { Schema } = mongoose;

const VideoSchema = new Schema({
  videoURL: { type: String, required: true },
  description: { type: String },
  order: { type: Number },
});

const SubmoduleSchema = new Schema({
  submoduleName: { type: String, required: true },
  videos: [VideoSchema],
});

const YouTubeLinkSchema = new Schema(
  {
    moduleName: { type: String, required: true },
    submodules: [SubmoduleSchema],
  },
  { timestamps: true }
);

// Exporting the model as YouTubeLink
module.exports = mongoose.model('YouTubeLink', YouTubeLinkSchema);


