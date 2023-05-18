const mongoose = require('mongoose');

const coinsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  },
  coins: {
    type: Number,
    required: true,
    default: 0
  },
  rank: {
    type: Number,
    default : 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},);

const Coins = mongoose.model('Coins', coinsSchema);

module.exports = Coins;
