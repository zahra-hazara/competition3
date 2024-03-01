// GoalController.js
const Goal = require('../models/goalModel');

const createGoal = async (req, res) => {
  try {
    const { text, dueDate, priority } = req.body;
    // Validate request...
    const goal = await Goal.create({
      text,
      dueDate,
      priority,
      user: req.user._id, // Assuming user is attached to req by auth middleware
    });
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id });
    res.json(goals);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, dueDate, priority } = req.body;
    // Validate request...
    const goal = await Goal.findOneAndUpdate({ _id: id, user: req.user._id }, { text, dueDate, priority }, { new: true });
    if (!goal) {
      return res.status(404).send('Goal not found');
    }
    res.json(goal);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await Goal.findOneAndDelete({ _id: id, user: req.user._id });
    if (!goal) {
      return res.status(404).send('Goal not found');
    }
    res.send('Goal deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
};
