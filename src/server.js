// src/server.js

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./db/database');
const taskRoutes = require('./routes/tasksRoutes');
const holidayTaskRoutes = require('./routes/holidayTasks-Routes');
const authRoutes = require('./routes/authRoutes'); // Import auth routes
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // Persist session for authentication

// Routes
app.use('/', authRoutes); // Authentication routes
app.use('/tasks', taskRoutes); // Task routes (protected)
app.use('/holidayTasks', holidayTaskRoutes); // Holiday Task routes (protected)

// Swagger API Documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
