# Smart Emergency Orchestration System

A real-time emergency coordination platform that optimizes patient routing, hospital resource allocation, and emergency prioritization.

## Features

- **Severity-Based Prioritization**: Automatic calculation of patient severity using clinical scoring
- **Intelligent Hospital Selection**: Optimal hospital assignment based on resources, capacity, and load
- **Real-Time Updates**: Live dashboard updates using Socket.io
- **Role-Based Access**: Separate interfaces for Ambulance, Hospital, and Admin users
- **Decision Logging**: Transparent tracking of all system decisions
- **Dynamic Queue Management**: Automatic reordering based on severity scores

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Real-Time**: Socket.io
- **Authentication**: JWT

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or connection URI)
- npm or yarn

## Installation

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/emergency-system
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On Linux/Mac
mongod

# Or if using MongoDB as a service
sudo systemctl start mongod
```

### 4. Seed Database

Populate the database with initial data:

```bash
node server/seed.js
```

This creates:
- 3 hospitals with different resource capacities
- 5 users (1 ambulance, 3 hospital staff, 1 admin)

### 5. Start the Application

```bash
# Start both backend and frontend
npm run dev

# Or start separately:
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Default Login Credentials

| Role | Username | Password |
|------|----------|----------|
| Ambulance | ambulance1 | password123 |
| Hospital 1 | hospital1 | password123 |
| Hospital 2 | hospital2 | password123 |
| Hospital 3 | hospital3 | password123 |
| Admin | admin | password123 |

## Usage Guide

### Ambulance Dashboard
1. Login with ambulance credentials
2. Fill in patient information:
   - Patient name and age
   - Vital signs (heart rate, blood pressure, oxygen level)
   - Consciousness level
   - Injury type
3. Submit to create case
4. System automatically:
   - Calculates severity score
   - Selects optimal hospital
   - Displays assignment with ETA

### Hospital Dashboard
1. Login with hospital credentials
2. View real-time emergency queue (sorted by severity)
3. Monitor incoming cases with patient details
4. Update case status (Assigned → In Transit → Arrived → Completed)
5. Track hospital resources and capacity

### Admin Dashboard
1. Login with admin credentials
2. Monitor all hospitals and their load distribution
3. View system-wide metrics (total cases, active cases)
4. Review decision logs with timestamps and reasons
5. Track hospital resource utilization

## Severity Calculation

The system uses a rule-based scoring algorithm:

**Factors:**
- Heart Rate: Normal (60-100) vs Abnormal
- Oxygen Level: <90% (critical), 90-95% (moderate), >95% (normal)
- Consciousness: Alert, Confused, Unconscious
- Injury Type: Cardiac, Trauma, Stroke (high), Respiratory (medium), Fracture/Minor (low)

**Categories:**
- Critical: Score ≥ 10
- High: Score 7-9
- Moderate: Score 4-6
- Stable: Score < 4

## Hospital Selection Logic

Hospitals are scored based on:
- ICU bed availability (weight: 3)
- Operating theater availability (weight: 2)
- ER capacity (weight: 1)
- Active case load (penalty: -2 per case)

The system selects the hospital with the highest score.

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Cases
- `POST /api/cases` - Create emergency case
- `GET /api/cases` - Get all cases
- `PUT /api/cases/:id/status` - Update case status

### Hospitals
- `GET /api/hospitals` - Get all hospitals
- `POST /api/hospitals` - Create hospital (admin only)
- `PUT /api/hospitals/:id` - Update hospital resources

### Dashboard
- `GET /api/dashboard/hospital/:hospitalId` - Hospital dashboard data
- `GET /api/dashboard/admin` - Admin dashboard data

## Project Structure

```
├── server/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── utils/           # Severity calculator, hospital selector
│   ├── index.js         # Server entry point
│   └── seed.js          # Database seeding
├── client/
│   ├── src/
│   │   ├── pages/       # Dashboard components
│   │   ├── utils/       # API client, Socket.io
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   └── package.json
├── package.json
└── README.md
```

## Real-Time Features

The system uses Socket.io for real-time updates:
- New case creation broadcasts to all connected clients
- Case status updates reflect immediately
- Hospital resource changes trigger dashboard updates
- Queue automatically reorders when higher severity cases arrive

## Security

- Passwords hashed using bcrypt
- JWT-based authentication
- Role-based access control
- Protected API endpoints

## Future Enhancements

- Predictive analytics for hospital overload
- ML-based survival prediction
- City-wide emergency heatmaps
- Ambulance repositioning intelligence
- Integration with real hospital EHR systems
- Mobile app for ambulance staff

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check MONGODB_URI in .env file

**Port Already in Use:**
- Change PORT in .env file
- Or kill process using the port

**Real-Time Updates Not Working:**
- Check Socket.io connection in browser console
- Ensure backend and frontend URLs match

## License

MIT

## Contributing

This is a hackathon prototype. Contributions welcome!
