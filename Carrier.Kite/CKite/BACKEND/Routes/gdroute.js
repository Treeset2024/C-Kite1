const express = require('express');
const groupDiscussionController = require('../Controller/groupdiscussionController'); // Adjust the path if needed
const router = express.Router();

// Route to create multiple group discussions (bulk upload)
router.post('/Group-Discussions', groupDiscussionController.createDiscussion);

// Route to get all group discussions with pagination
router.get('/Group-Discussion', groupDiscussionController.getAllDiscussions);

// Route to get a specific group discussion by ID
router.get('/Group-Discussions/:id', groupDiscussionController.getDiscussionById);

// Route to update a group discussion by ID
router.put('/Group-Discussions/:id', groupDiscussionController.updateDiscussionById);

// Route to delete a group discussion by ID
router.delete('/Group-Discussions/:id', groupDiscussionController.deleteDiscussionById);

module.exports = router;
