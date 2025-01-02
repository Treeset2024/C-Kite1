const Result = require('../model/results'); // Adjust the path to the model as necessary

// Create a new result
const createResult = async (req, res) => {
  try {
    const { user, module, submodule, score } = req.body;
    const newResult = new Result({ user, module, submodule, score });
    await newResult.save();
    res.status(201).json(newResult);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get paginated results
const getResults = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      
    };
    const results = await Result.paginate({}, options);
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a specific result by ID
const getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id).populate('user');
    if (!result) return res.status(404).json({ message: 'Result not found' });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a result by ID
const updateResult = async (req, res) => {
  try {
    const updatedResult = await Result.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedResult) return res.status(404).json({ message: 'Result not found' });
    res.status(200).json(updatedResult);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a result by ID
const deleteResult = async (req, res) => {
  try {
    const deletedResult = await Result.findByIdAndDelete(req.params.id);
    if (!deletedResult) return res.status(404).json({ message: 'Result not found' });
    res.status(200).json({ message: 'Result deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  createResult,
  getResults,
  getResultById,
  updateResult,
  deleteResult,
};