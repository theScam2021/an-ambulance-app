const express = require('express');
const Case = require('../models/Case');
const Hospital = require('../models/Hospital');
const DecisionLog = require('../models/DecisionLog');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/hospital/:hospitalId', auth, async (req, res) => {
  try {
    const cases = await Case.find({ 
      assignedHospital: req.params.hospitalId,
      status: { $in: ['assigned', 'in-transit', 'arrived'] }
    })
    .populate('assignedHospital')
    .sort({ severityScore: -1, createdAt: 1 });

    const hospital = await Hospital.findById(req.params.hospitalId);
    
    res.json({ cases, hospital });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/admin', auth, async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    const totalCases = await Case.countDocuments();
    const activeCases = await Case.countDocuments({ 
      status: { $in: ['assigned', 'in-transit', 'arrived'] }
    });
    
    const recentLogs = await DecisionLog.find()
      .populate('caseId')
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({ hospitals, totalCases, activeCases, recentLogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
