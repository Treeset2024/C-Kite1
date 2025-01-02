const express = require('express');
const router = express.Router();
const YouTubeLink = require('../model/YouTubeLinkmodule'); // Ensure the correct path to the Module model

// Route: Add Direct Videos
// Add Direct Videos Route
// Add Direct Videos Route
router.post('/add-direct-videos', async (req, res) => {
  try {
    const { moduleName, submodules } = req.body;

    // Validation
    if (!moduleName || !submodules || submodules.length === 0) {
      return res.status(400).json({
        error: 'moduleName and submodules with videos are required.',
      });
    }

    // Create a new entry
    const newEntry = new YouTubeLink({ moduleName, submodules });

    // Save to database
    await newEntry.save();

    res.status(201).json({
      message: 'Direct video links added successfully',
      entry: newEntry,
    });
  } catch (error) {
    console.error('Error adding direct video links:', error);
    res.status(500).json({
      error: 'Error adding direct video links',
      details: error.message,
    });
  }
});

// Fetch All Route
router.get('/all', async (req, res) => {
  try {
    const allEntries = await YouTubeLink.find();

    res.status(200).json(allEntries);
  } catch (error) {
    res.status(500).json({
      error: 'Error fetching entries',
      details: error.message,
    });
  }
});

// Export the router



// Route: Fetch videos for a specific module
router.get('/module/:moduleName', async (req, res) => {
  const { moduleName } = req.params;

  try {
    const entry = await YouTubeLink.findOne({ moduleName });
    if (!entry) {
      return res.status(404).json({
        message: 'No video links found for the specified module.',
      });
    }
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({
      error: 'Error fetching videos for the module',
      details: error.message,
    });
  }
});
router.get('/module/:moduleName/submodule/:submoduleName', async (req, res) => {
  const { moduleName, submoduleName } = req.params;

  try {
    const entry = await YouTubeLink.findOne({ moduleName });

    if (!entry) {
      return res.status(404).json({
        message: 'No video links found for the specified module.',
      });
    }

    const submodule = entry.submodules.find(
      (sub) => sub.submoduleName.toLowerCase() === submoduleName.toLowerCase()
    );

    if (!submodule) {
      return res.status(404).json({
        message: `No video links found for the submodule "${submoduleName}".`,
      });
    }

    const response = {
      moduleName: entry.moduleName,
      submoduleName: submodule.submoduleName,
      videos: submodule.videos.map((video) => ({
        videoURL: video.videoURL,
        description: video.description || null,
        order: video.order || null,
      })),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching submodule:', error);
    res.status(500).json({
      error: 'Error fetching videos for the submodule',
      details: error.message,
    });
  }
});

// Route: Fetch all modules with grouped submodules and videos
/*router.get('/all', async (req, res) => {
  try {
    const allModules = await Module.find();

    // Group modules with their submodules and videos
    const groupedModules = allModules.map((module) => ({
      moduleName: module.moduleName,
      submodules: module.submodules.map((submodule) => ({
        submoduleName: submodule.submoduleName,
        videos: submodule.videos,
      })),
    }));

    res.status(200).json(groupedModules);
  } catch (error) {
    res.status(500).json({
      error: 'Error fetching grouped video links',
      details: error.message,
    });
  }
});*/

// Route: Update videos for a specific submodule by module ID
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { submodules } = req.body;

  try {
    // Validate input
    if (!submodules || submodules.length === 0) {
      return res.status(400).json({
        error: 'Submodules with videos are required for update.',
      });
    }

    // Update module by ID
    const updatedEntry = await YouTubeLink.findByIdAndUpdate(
      id,
      { submodules },
      { new: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({
        message: 'Module not found.',
      });
    }

    res.status(200).json({
      message: 'Videos updated successfully.',
      entry: updatedEntry,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error updating videos',
      details: error.message,
    });
  }
});

module.exports = router;
