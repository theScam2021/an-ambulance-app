import { useState, useEffect } from 'react';
import { dashboard, hospitals as hospitalsApi } from '../utils/api';
import { socket, connectSocket, disconnectSocket } from '../utils/socket';

function AdminDashboard({ user, onLogout }) {
  const [data, setData] = useState({
    hospitals: [],
    totalCases: 0,
    activeCases: 0,
    recentLogs: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    connectSocket();

    socket.on('case_created', () => {
      loadData();
    });

    socket.on('hospital_updated', () => {
      loadData();
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  const loadData = async () => {
    try {
      const response = await dashboard.getAdmin();
      setData(response.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-purple-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span>{user.username}</span>
            <button onClick={onLogout} className="bg-purple-700 px-4 py-2 rounded hover:bg-purple-800">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Hospitals</p>
            <p className="text-3xl font-bold text-purple-600">{data.hospitals.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Cases</p>
            <p className="text-3xl font-bold text-blue-600">{data.totalCases}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Active Cases</p>
            <p className="text-3xl font-bold text-green-600">{data.activeCases}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Hospital Load Distribution</h2>
            <div className="space-y-3">
              {data.hospitals.map((hospital) => (
                <div key={hospital._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold">{hospital.name}</h3>
                      <p className="text-sm text-gray-600">{hospital.location}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {hospital.activeCases} active
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm mt-3">
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-gray-600 text-xs">ICU Beds</p>
                      <p className="font-bold">{hospital.resources?.icuBeds}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-gray-600 text-xs">OT</p>
                      <p className="font-bold">{hospital.resources?.otAvailable}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-gray-600 text-xs">ER Cap</p>
                      <p className="font-bold">{hospital.resources?.erCapacity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Recent Decision Logs</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {data.recentLogs.map((log) => (
                <div key={log._id} className="border-l-4 border-blue-500 pl-3 py-2 bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{log.actionType.replace('_', ' ').toUpperCase()}</p>
                      <p className="text-xs text-gray-600 mt-1">{log.reason}</p>
                      {log.metadata?.hospitalName && (
                        <p className="text-xs text-blue-600 mt-1">→ {log.metadata.hospitalName}</p>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(log.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
