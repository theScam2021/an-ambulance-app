const express = require('express');
const Case = require('../models/Case');
const Hospital = require('../models/Hospital');
const DecisionLog = require('../models/DecisionLog');
const { auth, roleAuth } = require('../middleware/auth');
const { calculateSeverity } = require('../utils/severityCalculator');
const { selectOptimalHospital } = require('../utils/hospitalSelector');

const router = express.Router();

router.post('/', auth, roleAuth('ambulance'), async (req, res) => {
  try {
    const { patientName, age, vitals, injuryType } = req.body;

    // Calculate severity
    const { score, category } = calculateSeverity(vitals, injuryType);

    // Select optimal hospital
    const { hospital, reason } = await selectOptimalHospital(category);

    // Create case
    const newCase = new Case({
      patientName,
      age,
      vitals,
      injuryType,
      severityScore: score,
      severityCategory: category,
      assignedHospital: hospital._id,
      status: 'assigned',
      createdBy: req.user.userId,
      eta: Math.floor(Math.random() * 20) + 10
    });

    await newCase.save();

    // Update hospital active cases
    await Hospital.findByIdAndUpdate(hospital._id, { $inc: { activeCases: 1 } });

    // Log decision
    await new DecisionLog({
      caseId: newCase._id,
      actionType: 'hospital_assignment',
      reason,
      metadata: { hospitalId: hospital._id, hospitalName: hospital.name }
    }).save();

    // Emit real-time update
    const io = req.app.get('io');
    io.emit('case_created', await newCase.populate('assignedHospital'));

    res.status(201).json(await newCase.populate('assignedHospital'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const cases = await Case.find()
      .populate('assignedHospital')
      .sort({ severityScore: -1, createdAt: 1 });
    res.json(cases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const caseItem = await Case.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('assignedHospital');

    const io = req.app.get('io');
    io.emit('case_updated', caseItem);

    res.json(caseItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
