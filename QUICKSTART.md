# Quick Start Guide

## Setup in 5 Minutes

### Step 1: Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client && npm install && cd ..
```

### Step 2: Setup Environment
```bash
# Copy example env file
cp .env.example .env

# Edit .env if needed (default values work for local development)
```

### Step 3: Start MongoDB
```bash
# Make sure MongoDB is running
# On Linux:
sudo systemctl start mongod

# On Mac with Homebrew:
brew services start mongodb-community

# Or run directly:
mongod
```

### Step 4: Seed Database
```bash
node server/seed.js
```

### Step 5: Start Application
```bash
npm run dev
```

Visit: http://localhost:5173

## Test the System

### 1. Login as Ambulance
- Username: `ambulance1`
- Password: `password123`

### 2. Create Emergency Case
Fill in the form with sample data:
- Patient Name: John Doe
- Age: 45
- Heart Rate: 130 (high)
- Blood Pressure: 140/90
- Oxygen Level: 88 (low)
- Consciousness: Alert
- Injury Type: Cardiac

Click "Create Case" - System will:
- Calculate severity (should be Critical or High)
- Select optimal hospital
- Show assignment details

### 3. View Hospital Dashboard
- Logout and login as `hospital1` / `password123`
- See the case appear in the queue
- Update status through dropdown

### 4. View Admin Dashboard
- Logout and login as `admin` / `password123`
- See all hospitals and their loads
- View decision logs

## Troubleshooting

**Can't connect to MongoDB?**
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Or check the process
ps aux | grep mongod
```

**Port 5000 already in use?**
Edit `.env` and change PORT to another value like 5001

**Frontend not loading?**
Make sure you're in the root directory when running `npm run dev`

## What to Test

1. **Severity Calculation**: Try different vital signs and injury types
2. **Hospital Selection**: Create multiple cases and see distribution
3. **Real-Time Updates**: Open hospital dashboard in another browser tab
4. **Priority Queue**: Create cases with different severities
5. **Status Updates**: Change case status and see updates

## Next Steps

- Modify severity calculation in `server/utils/severityCalculator.js`
- Adjust hospital selection logic in `server/utils/hospitalSelector.js`
- Customize UI in `client/src/pages/`
- Add more hospitals via Admin panel (future feature)
