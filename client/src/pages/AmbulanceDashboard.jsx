import { useState } from 'react';
import { cases } from '../utils/api';

function AmbulanceDashboard({ user, onLogout }) {
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    heartRate: '',
    bloodPressure: '',
    oxygenLevel: '',
    consciousness: 'alert',
    injuryType: 'trauma'
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await cases.create({
        patientName: formData.patientName,
        age: parseInt(formData.age),
        vitals: {
          heartRate: parseInt(formData.heartRate),
          bloodPressure: formData.bloodPressure,
          oxygenLevel: parseInt(formData.oxygenLevel),
          consciousness: formData.consciousness
        },
        injuryType: formData.injuryType
      });
      
      setResult(response.data);
      setFormData({
        patientName: '',
        age: '',
        heartRate: '',
        bloodPressure: '',
        oxygenLevel: '',
        consciousness: 'alert',
        injuryType: 'trauma'
      });
    } catch (error) {
      alert('Error creating case: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (category) => {
    const colors = {
      'Critical': 'bg-red-600',
      'High': 'bg-orange-500',
      'Moderate': 'bg-yellow-500',
      'Stable': 'bg-green-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Ambulance Dashboard</h1>
          <div className="flex items-center gap-4">
            <span>{user.username}</span>
            <button onClick={onLogout} className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Create Emergency Case</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Patient Name</label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Heart Rate</label>
                  <input
                    type="number"
                    value={formData.heartRate}
                    onChange={(e) => setFormData({...formData, heartRate: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Oxygen Level</label>
                  <input
                    type="number"
                    value={formData.oxygenLevel}
                    onChange={(e) => setFormData({...formData, oxygenLevel: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Blood Pressure</label>
                <input
                  type="text"
                  value={formData.bloodPressure}
                  onChange={(e) => setFormData({...formData, bloodPressure: e.target.value})}
                  placeholder="120/80"
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Consciousness</label>
                <select
                  value={formData.consciousness}
                  onChange={(e) => setFormData({...formData, consciousness: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="alert">Alert</option>
                  <option value="confused">Confused</option>
                  <option value="unconscious">Unconscious</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Injury Type</label>
                <select
                  value={formData.injuryType}
                  onChange={(e) => setFormData({...formData, injuryType: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="trauma">Trauma</option>
                  <option value="cardiac">Cardiac</option>
                  <option value="stroke">Stroke</option>
                  <option value="respiratory">Respiratory</option>
                  <option value="fracture">Fracture</option>
                  <option value="minor">Minor</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Creating...' : 'Create Case'}
              </button>
            </form>
          </div>

          {result && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Case Created Successfully</h2>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Severity:</span>
                  <span className={`${getSeverityColor(result.severityCategory)} text-white px-3 py-1 rounded-full text-sm`}>
                    {result.severityCategory}
                  </span>
                  <span className="text-gray-600">(Score: {result.severityScore})</span>
                </div>

                <div>
                  <span className="font-medium">Assigned Hospital:</span>
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                    <p className="font-semibold text-lg">{result.assignedHospital?.name}</p>
                    <p className="text-sm text-gray-600">{result.assignedHospital?.location}</p>
                    <p className="text-sm mt-2">ETA: {result.eta} minutes</p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium mb-1">Hospital Resources:</p>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>ICU Beds: {result.assignedHospital?.resources?.icuBeds}</p>
                    <p>OT Available: {result.assignedHospital?.resources?.otAvailable}</p>
                    <p>ER Capacity: {result.assignedHospital?.resources?.erCapacity}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AmbulanceDashboard;
