import { useState, useEffect } from 'react';
import { dashboard, cases as casesApi } from '../utils/api';
import { socket, connectSocket, disconnectSocket } from '../utils/socket';

function HospitalDashboard({ user, onLogout }) {
  const [cases, setCases] = useState([]);
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    connectSocket();

    socket.on('case_created', (newCase) => {
      if (newCase.assignedHospital?._id === user.hospitalId) {
        setCases(prev => [...prev, newCase].sort((a, b) => b.severityScore - a.severityScore));
      }
    });

    socket.on('case_updated', (updatedCase) => {
      setCases(prev => prev.map(c => c._id === updatedCase._id ? updatedCase : c));
    });

    return () => {
      disconnectSocket();
    };
  }, [user.hospitalId]);

  const loadData = async () => {
    try {
      const response = await dashboard.getHospital(user.hospitalId);
      setCases(response.data.cases);
      setHospital(response.data.hospital);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (caseId, status) => {
    try {
      await casesApi.updateStatus(caseId, status);
    } catch (error) {
      alert('Error updating status');
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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-green-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Hospital Dashboard</h1>
          <div className="flex items-center gap-4">
            <span>{hospital?.name}</span>
            <button onClick={onLogout} className="bg-green-700 px-4 py-2 rounded hover:bg-green-800">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">ICU Beds</p>
            <p className="text-2xl font-bold">{hospital?.resources?.icuBeds}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">OT Available</p>
            <p className="text-2xl font-bold">{hospital?.resources?.otAvailable}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">ER Capacity</p>
            <p className="text-2xl font-bold">{hospital?.resources?.erCapacity}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">Active Cases</p>
            <p className="text-2xl font-bold">{cases.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Emergency Queue (Priority Sorted)</h2>
          
          {cases.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No active cases</p>
          ) : (
            <div className="space-y-3">
              {cases.map((caseItem, index) => (
                <div key={caseItem._id} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-bold text-gray-700">#{index + 1}</span>
                        <span className={`${getSeverityColor(caseItem.severityCategory)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                          {caseItem.severityCategory}
                        </span>
                        <span className="text-sm text-gray-500">Score: {caseItem.severityScore}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <p><span className="font-medium">Patient:</span> {caseItem.patientName}</p>
                        <p><span className="font-medium">Age:</span> {caseItem.age}</p>
                        <p><span className="font-medium">Injury:</span> {caseItem.injuryType}</p>
                        <p><span className="font-medium">ETA:</span> {caseItem.eta} min</p>
                        <p><span className="font-medium">Heart Rate:</span> {caseItem.vitals?.heartRate}</p>
                        <p><span className="font-medium">O2:</span> {caseItem.vitals?.oxygenLevel}%</p>
                      </div>
                    </div>

                    <div className="ml-4">
                      <select
                        value={caseItem.status}
                        onChange={(e) => updateStatus(caseItem._id, e.target.value)}
                        className="px-3 py-2 border rounded-lg text-sm"
                      >
                        <option value="assigned">Assigned</option>
                        <option value="in-transit">In Transit</option>
                        <option value="arrived">Arrived</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HospitalDashboard;
