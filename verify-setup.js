#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Smart Emergency System Setup...\n');

const checks = {
  passed: 0,
  failed: 0,
  warnings: 0
};

function check(name, condition, type = 'error') {
  if (condition) {
    console.log(`✅ ${name}`);
    checks.passed++;
  } else {
    if (type === 'warning') {
      console.log(`⚠️  ${name}`);
      checks.warnings++;
    } else {
      console.log(`❌ ${name}`);
      checks.failed++;
    }
  }
}

// Check required files
console.log('📁 Checking Project Structure...');
check('package.json exists', fs.existsSync('package.json'));
check('.env.example exists', fs.existsSync('.env.example'));
check('server/index.js exists', fs.existsSync('server/index.js'));
check('server/seed.js exists', fs.existsSync('server/seed.js'));
check('client/package.json exists', fs.existsSync('client/package.json'));
check('client/src/App.jsx exists', fs.existsSync('client/src/App.jsx'));

// Check models
console.log('\n📊 Checking Models...');
check('User model exists', fs.existsSync('server/models/User.js'));
check('Case model exists', fs.existsSync('server/models/Case.js'));
check('Hospital model exists', fs.existsSync('server/models/Hospital.js'));
check('DecisionLog model exists', fs.existsSync('server/models/DecisionLog.js'));

// Check routes
console.log('\n🛣️  Checking Routes...');
check('Auth routes exist', fs.existsSync('server/routes/auth.js'));
check('Case routes exist', fs.existsSync('server/routes/cases.js'));
check('Hospital routes exist', fs.existsSync('server/routes/hospitals.js'));
check('Dashboard routes exist', fs.existsSync('server/routes/dashboard.js'));

// Check frontend pages
console.log('\n🎨 Checking Frontend Pages...');
check('Login page exists', fs.existsSync('client/src/pages/Login.jsx'));
check('Ambulance dashboard exists', fs.existsSync('client/src/pages/AmbulanceDashboard.jsx'));
check('Hospital dashboard exists', fs.existsSync('client/src/pages/HospitalDashboard.jsx'));
check('Admin dashboard exists', fs.existsSync('client/src/pages/AdminDashboard.jsx'));

// Check utilities
console.log('\n🔧 Checking Utilities...');
check('Severity calculator exists', fs.existsSync('server/utils/severityCalculator.js'));
check('Hospital selector exists', fs.existsSync('server/utils/hospitalSelector.js'));
check('Auth middleware exists', fs.existsSync('server/middleware/auth.js'));
check('API client exists', fs.existsSync('client/src/utils/api.js'));
check('Socket client exists', fs.existsSync('client/src/utils/socket.js'));

// Check documentation
console.log('\n📚 Checking Documentation...');
check('README.md exists', fs.existsSync('README.md'));
check('QUICKSTART.md exists', fs.existsSync('QUICKSTART.md'));
check('TESTING_CHECKLIST.md exists', fs.existsSync('TESTING_CHECKLIST.md'));
check('DEPLOYMENT.md exists', fs.existsSync('DEPLOYMENT.md'));
check('PROJECT_SUMMARY.md exists', fs.existsSync('PROJECT_SUMMARY.md'));

// Check dependencies
console.log('\n📦 Checking Dependencies...');
check('node_modules exists', fs.existsSync('node_modules'), 'warning');
check('client/node_modules exists', fs.existsSync('client/node_modules'), 'warning');

// Check environment
console.log('\n⚙️  Checking Environment...');
check('.env file exists', fs.existsSync('.env'), 'warning');

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 Verification Summary:');
console.log(`✅ Passed: ${checks.passed}`);
console.log(`❌ Failed: ${checks.failed}`);
console.log(`⚠️  Warnings: ${checks.warnings}`);
console.log('='.repeat(50));

if (checks.failed > 0) {
  console.log('\n❌ Setup verification failed. Please check missing files.');
  process.exit(1);
} else if (checks.warnings > 0) {
  console.log('\n⚠️  Setup complete with warnings.');
  console.log('\nNext steps:');
  if (!fs.existsSync('node_modules')) {
    console.log('  1. Run: npm install');
  }
  if (!fs.existsSync('client/node_modules')) {
    console.log('  2. Run: cd client && npm install && cd ..');
  }
  if (!fs.existsSync('.env')) {
    console.log('  3. Run: cp .env.example .env');
  }
  console.log('  4. Start MongoDB');
  console.log('  5. Run: node server/seed.js');
  console.log('  6. Run: npm run dev');
} else {
  console.log('\n✅ All checks passed! Project structure is complete.');
  console.log('\nNext steps:');
  console.log('  1. Ensure MongoDB is running');
  console.log('  2. Run: node server/seed.js (if not done)');
  console.log('  3. Run: npm run dev');
  console.log('  4. Visit: http://localhost:5173');
}

console.log('\n📖 For detailed instructions, see QUICKSTART.md\n');
