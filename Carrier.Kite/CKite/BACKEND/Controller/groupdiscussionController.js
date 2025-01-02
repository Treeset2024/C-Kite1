const GroupDiscussion = require('../model/gd'); // Import the model

const groupDiscussionController = {
  /* Create a new group discussion
  createDiscussion: async (req, res) => {
    try {
      const { title, description, videoUrl } = req.body;

      const newDiscussion = new GroupDiscussion({
        title,
        description,
        videoUrl,
      });

      await newDiscussion.save();
      res.status(201).json({ message: 'Group discussion created successfully', discussion: newDiscussion });
    } catch (error) {
      res.status(400).json({ message: 'Error creating discussion', error: error.message });
    }
  },*/
// Create multiple discussions in bulk
createDiscussion: async (req, res) => {
  try {
    const discussions = req.body; // Expecting an array of discussion objects

    // Ensure the request body is an array and not empty
    if (!Array.isArray(discussions) || discussions.length === 0) {
      return res.status(400).json({ message: 'Request body must be a non-empty array' });
    }

    // Check for missing fields in each discussion
    const invalidDiscussions = discussions.filter(
      (discussion) => !discussion.title || !discussion.videoUrl
    );
    if (invalidDiscussions.length > 0) {
      return res.status(400).json({
        message: 'One or more discussions are missing required fields (title, videoUrl)',
        invalidDiscussions,
      });
    }

    // Insert valid discussions into the database
    const newDiscussions = await GroupDiscussion.insertMany(discussions);

    res.status(201).json({
      message: 'Group discussions created successfully',
      discussions: newDiscussions,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating discussions', error: error.message });
  }
},


  // Get all group discussions with pagination
  getAllDiscussions: async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query; // Pagination parameters
      const discussions = await GroupDiscussion.paginate({}, { page, limit });

      res.status(200).json(discussions);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving discussions', error: error.message });
    }
  },

  // Get a specific group discussion by ID
  getDiscussionById: async (req, res) => {
    try {
      const discussionId = req.params.id;
      const discussion = await GroupDiscussion.findById(discussionId);

      if (!discussion) {
        return res.status(404).json({ message: 'Discussion not found' });
      }

      res.status(200).json(discussion);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving discussion', error: error.message });
    }
  },

  // Update a group discussion by ID
  updateDiscussionById: async (req, res) => {
    try {
      const discussionId = req.params.id;
      const updates = req.body;

      const updatedDiscussion = await GroupDiscussion.findByIdAndUpdate(discussionId, updates, {
        new: true, // Return the updated document
        runValidators: true, // Validate before updating
      });

      if (!updatedDiscussion) {
        return res.status(404).json({ message: 'Discussion not found' });
      }

      res.status(200).json({ message: 'Discussion updated successfully', discussion: updatedDiscussion });
    } catch (error) {
      res.status(400).json({ message: 'Error updating discussion', error: error.message });
    }
  },

  // Delete a group discussion by ID
  deleteDiscussionById: async (req, res) => {
    try {
      const discussionId = req.params.id;
      const deletedDiscussion = await GroupDiscussion.findByIdAndDelete(discussionId);

      if (!deletedDiscussion) {
        return res.status(404).json({ message: 'Discussion not found' });
      }

      res.status(200).json({ message: 'Discussion deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting discussion', error: error.message });
    }
  },
};

module.exports = groupDiscussionController;
