const fs = require('fs');
const mongoose = require('mongoose');
const Pmid = require('../models/Pmid');
const connectDB = require('../config/database');

const seedDatabase = async () => {
  try {
    await connectDB();

    const fileName = process.argv[2];
    if (!fileName) {
      console.error('Please provide a file name as an argument');
      process.exit(1);
    }

    const fileContent = fs.readFileSync(fileName, 'utf-8');
    const pmids = fileContent.split('\n').map(line => parseInt(line.trim())).filter(pmid => !isNaN(pmid));

    await Pmid.deleteMany({});

    const pmidDocuments = pmids.map(pmid => ({
      pmid,
      variations: [],
      status: 'incomplete'
    }));

    await Pmid.insertMany(pmidDocuments);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
