const Hospital = require('../models/Hospital');

const selectOptimalHospital = async (severityCategory) => {
  const hospitals = await Hospital.find();

  if (hospitals.length === 0) {
    throw new Error('No hospitals available');
  }

  // Score each hospital
  const scoredHospitals = hospitals.map(hospital => {
    let score = 0;

    // Resource availability
    score += hospital.resources.icuBeds * 3;
    score += hospital.resources.otAvailable * 2;
    score += hospital.resources.erCapacity * 1;

    // Penalize for active cases
    score -= hospital.activeCases * 2;

    // Ensure minimum capacity
    if (hospital.resources.erCapacity === 0) score = -1000;

    return { hospital, score };
  });

  // Sort by score descending
  scoredHospitals.sort((a, b) => b.score - a.score);

  const selected = scoredHospitals[0].hospital;
  
  const reason = `Selected based on: ICU beds (${selected.resources.icuBeds}), OT (${selected.resources.otAvailable}), ER capacity (${selected.resources.erCapacity}), Active cases (${selected.activeCases})`;

  return { hospital: selected, reason };
};

module.exports = { selectOptimalHospital };
