const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add a text value']
  },
  dueDate: {
    type: Date,
    required: [true, 'Please add a due date']
  },
  priority: {
    type: String,
    required: [true, 'Please set a priority'],
    enum: ['Low', 'Medium', 'High']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Assumes you have a User model defined elsewhere
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Goal', goalSchema);
