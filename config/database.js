const mongoose = require('mongoose');

// Add this line to address the deprecation warning
mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/pmid_variations', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('>> MongoDB connected');
    console.log(`http://localhost:3000/curate`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
