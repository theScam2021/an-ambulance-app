const calculateSeverity = (vitals, injuryType) => {
  let score = 0;

  // Heart rate scoring
  if (vitals.heartRate < 50 || vitals.heartRate > 120) score += 3;
  else if (vitals.heartRate < 60 || vitals.heartRate > 100) score += 2;
  else score += 1;

  // Oxygen level scoring
  if (vitals.oxygenLevel < 90) score += 3;
  else if (vitals.oxygenLevel < 95) score += 2;
  else score += 1;

  // Consciousness scoring
  const consciousnessMap = {
    'unconscious': 3,
    'confused': 2,
    'alert': 1
  };
  score += consciousnessMap[vitals.consciousness?.toLowerCase()] || 1;

  // Injury type scoring
  const injuryMap = {
    'cardiac': 3,
    'trauma': 3,
    'stroke': 3,
    'respiratory': 2,
    'fracture': 1,
    'minor': 1
  };
  score += injuryMap[injuryType?.toLowerCase()] || 2;

  // Categorize severity
  let category;
  if (score >= 10) category = 'Critical';
  else if (score >= 7) category = 'High';
  else if (score >= 4) category = 'Moderate';
  else category = 'Stable';

  return { score, category };
};

module.exports = { calculateSeverity };
