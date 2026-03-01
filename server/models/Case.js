const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  vitals: {
    heartRate: Number,
    bloodPressure: String,
    oxygenLevel: Number,
    consciousness: String
  },
  injuryType: {
    type: String,
    required: true
  },
  severityScore: {
    type: Number,
    required: true
  },
  severityCategory: {
    type: String,
    enum: ['Critical', 'High', 'Moderate', 'Stable'],
    required: true
  },
  assignedHospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital'
  },
  status: {
    type: String,
    enum: ['pending', 'assigned', 'in-transit', 'arrived', 'completed'],
    default: 'pending'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  eta: Number
}, { timestamps: true });

module.exports = mongoose.model('Case', caseSchema);
