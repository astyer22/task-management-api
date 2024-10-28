const mongoose = require('mongoose');
require('dotenv').config(); 

const connectDB = async () => {
    try {
        // Connect to MongoDB using the URI from the .env file without deprecated options
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); 
    }
};

module.exports = connectDB;
