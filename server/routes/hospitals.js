const express = require('express');
const Hospital = require('../models/Hospital');
const { auth, roleAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, roleAuth('admin'), async (req, res) => {
  try {
    const hospital = new Hospital(req.body);
    await hospital.save();
    res.status(201).json(hospital);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', auth, roleAuth('hospital', 'admin'), async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    const io = req.app.get('io');
    io.emit('hospital_updated', hospital);
    
    res.json(hospital);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
