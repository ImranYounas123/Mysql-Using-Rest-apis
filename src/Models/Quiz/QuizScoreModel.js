const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  quizID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  scores: {
    type: Number,
    default: 0
  },
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
