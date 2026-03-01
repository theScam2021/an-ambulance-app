require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Hospital = require('./models/Hospital');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/emergency-system');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Hospital.deleteMany({});
    console.log('Cleared existing data');

    // Create hospitals
    const hospitals = await Hospital.insertMany([
      {
        name: 'City General Hospital',
        location: 'Downtown, 123 Main St',
        resources: {
          icuBeds: 15,
          otAvailable: 5,
          erCapacity: 30
        },
        activeCases: 0
      },
      {
        name: 'St. Mary Medical Center',
        location: 'Northside, 456 Oak Ave',
        resources: {
          icuBeds: 20,
          otAvailable: 8,
          erCapacity: 40
        },
        activeCases: 0
      },
      {
        name: 'Regional Trauma Center',
        location: 'Eastside, 789 Pine Rd',
        resources: {
          icuBeds: 25,
          otAvailable: 10,
          erCapacity: 50
        },
        activeCases: 0
      }
    ]);
    console.log('Created hospitals');

    // Create users
    await User.create([
      {
        username: 'ambulance1',
        password: 'password123',
        role: 'ambulance'
      },
      {
        username: 'hospital1',
        password: 'password123',
        role: 'hospital',
        hospitalId: hospitals[0]._id
      },
      {
        username: 'hospital2',
        password: 'password123',
        role: 'hospital',
        hospitalId: hospitals[1]._id
      },
      {
        username: 'hospital3',
        password: 'password123',
        role: 'hospital',
        hospitalId: hospitals[2]._id
      },
      {
        username: 'admin',
        password: 'password123',
        role: 'admin'
      }
    ]);
    console.log('Created users');

    console.log('\n=== Seed Data Created Successfully ===');
    console.log('\nLogin Credentials:');
    console.log('Ambulance: ambulance1 / password123');
    console.log('Hospital 1: hospital1 / password123');
    console.log('Hospital 2: hospital2 / password123');
    console.log('Hospital 3: hospital3 / password123');
    console.log('Admin: admin / password123');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
