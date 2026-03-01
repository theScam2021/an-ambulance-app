const mongoose = require('mongoose');

const decisionLogSchema = new mongoose.Schema({
  caseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case',
    required: true
  },
  actionType: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, { timestamps: true });

module.exports = mongoose.model('DecisionLog', decisionLogSchema);
