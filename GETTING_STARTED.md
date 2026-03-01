# Getting Started - Smart Emergency Orchestration System

## 🚀 Quick Start (5 Minutes)

### Step 1: Verify Setup
```bash
node verify-setup.js
```

### Step 2: Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client && npm install && cd ..
```

### Step 3: Configure Environment
```bash
# Copy environment template
cp .env.example .env

# The default values work for local development
# No need to edit unless you have custom MongoDB setup
```

### Step 4: Start MongoDB
```bash
# Check if MongoDB is already running
sudo systemctl status mongod

# If not running, start it
sudo systemctl start mongod

# Or run MongoDB directly
mongod
```

### Step 5: Seed Database
```bash
node server/seed.js
```

You should see:
```
Connected to MongoDB
Cleared existing data
Created hospitals
Created users

=== Seed Data Created Successfully ===

Login Credentials:
Ambulance: ambulance1 / password123
Hospital 1: hospital1 / password123
Hospital 2: hospital2 / password123
Hospital 3: hospital3 / password123
Admin: admin / password123
```

### Step 6: Start Application
```bash
npm run dev
```

This starts both backend (port 5000) and frontend (port 5173).

### Step 7: Open Browser
Visit: **http://localhost:5173**

## 🎯 First Test

### Test Case Creation Flow

1. **Login as Ambulance**
   - Username: `ambulance1`
   - Password: `password123`

2. **Create a Critical Case**
   - Patient Name: `John Doe`
   - Age: `45`
   - Heart Rate: `130` (high)
   - Blood Pressure: `140/90`
   - Oxygen Level: `88` (low)
   - Consciousness: `Alert`
   - Injury Type: `Cardiac`
   - Click "Create Case"

3. **Observe Results**
   - Severity should be "Critical" or "High"
   - Hospital automatically assigned
   - ETA displayed
   - Hospital resources shown

4. **View Hospital Dashboard**
   - Logout (top right)
   - Login as `hospital1` / `password123`
   - See the case in the queue
   - Try changing status

5. **View Admin Dashboard**
   - Logout
   - Login as `admin` / `password123`
   - See all hospitals
   - View decision logs

## 📊 What You Should See

### Ambulance Dashboard
- Clean form for patient data entry
- Immediate severity calculation
- Hospital assignment with reasoning
- Color-coded severity badges

### Hospital Dashboard
- Live emergency queue
- Cases sorted by severity (Critical first)
- Resource status at top
- Status update dropdown

### Admin Dashboard
- Hospital load distribution
- System metrics (total cases, active cases)
- Recent decision logs
- Real-time updates

## 🔄 Test Real-Time Updates

1. Open two browser windows side by side
2. Login to Hospital Dashboard in one
3. Login to Ambulance Dashboard in other
4. Create a case in Ambulance Dashboard
5. Watch it appear instantly in Hospital Dashboard (no refresh needed!)

## 🎨 Color Coding

- 🔴 **Red**: Critical severity
- 🟠 **Orange**: High severity
- 🟡 **Yellow**: Moderate severity
- 🟢 **Green**: Stable severity

## 🧪 Test Different Scenarios

### Critical Case
- High heart rate (>120)
- Low oxygen (<90)
- Unconscious
- Cardiac/Trauma/Stroke injury

### Stable Case
- Normal heart rate (60-100)
- Good oxygen (>95)
- Alert
- Minor/Fracture injury

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod
```

### "Port 5000 already in use"
```bash
# Find and kill the process
lsof -ti:5000 | xargs kill -9

# Or change port in .env
PORT=5001
```

### "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules client/node_modules
npm install
cd client && npm install && cd ..
```

### Real-time updates not working
- Check browser console for Socket.io errors
- Ensure backend is running on port 5000
- Try refreshing the page

## 📱 Browser Compatibility

Tested and working on:
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## 🔐 Security Note

The default credentials are for development only. In production:
- Change JWT_SECRET in .env
- Use strong passwords
- Enable HTTPS
- Configure proper CORS

## 📚 Next Steps

After getting started:
1. Read **README.md** for complete documentation
2. Check **TESTING_CHECKLIST.md** for comprehensive testing
3. See **DEPLOYMENT.md** for production deployment
4. Review **PROJECT_SUMMARY.md** for technical details

## 💡 Tips

- Keep MongoDB running while using the app
- Use Chrome DevTools to see real-time Socket.io events
- Check `pm2 logs` if using PM2 in production
- Database is at `mongodb://localhost:27017/emergency-system`

## 🎓 Learning Resources

### Understanding the Code
- **Backend Logic**: `server/utils/severityCalculator.js`
- **Hospital Selection**: `server/utils/hospitalSelector.js`
- **API Routes**: `server/routes/`
- **Frontend Components**: `client/src/pages/`

### Customization Points
- Modify severity scoring algorithm
- Adjust hospital selection weights
- Change UI colors and styling
- Add new fields to case form

## ✅ Success Checklist

- [ ] MongoDB running
- [ ] Dependencies installed
- [ ] Database seeded
- [ ] Application running
- [ ] Can login as ambulance
- [ ] Can create case
- [ ] Can see case in hospital dashboard
- [ ] Real-time updates working
- [ ] Can view admin dashboard

## 🆘 Need Help?

1. Check the error message in terminal
2. Look at browser console (F12)
3. Review the relevant documentation file
4. Check MongoDB logs: `/var/log/mongodb/mongod.log`

## 🎉 You're Ready!

If you can:
- ✅ Login with different roles
- ✅ Create emergency cases
- ✅ See real-time updates
- ✅ View all three dashboards

**Congratulations! Your Smart Emergency System is working perfectly!** 🚀

Now you can:
- Demo the system
- Run comprehensive tests
- Deploy to production
- Customize for your needs

---

**Happy Coding!** 💻
