const mongoose = require('mongoose');

const PmidSchema = new mongoose.Schema({
  pmid: {
    type: Number,
    required: true,
    unique: true
  },
  variations: [String],
  status: {
    type: String,
    enum: ['incomplete', 'completed'],
    default: 'incomplete'
  }
});

module.exports = mongoose.model('Pmid', PmidSchema);
