const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  resources: {
    icuBeds: { type: Number, default: 0 },
    otAvailable: { type: Number, default: 0 },
    erCapacity: { type: Number, default: 0 }
  },
  activeCases: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Hospital', hospitalSchema);
