// src/routes/index.js

const express = require('express');
const router = express.Router();

// Route for Swagger documentation
router.use('/', require('./swagger'));

// Routes for holiday tasks
router.use('/holidayTasks', require('./holidayTask-Routes'));

// Routes for general tasks
router.use('/tasks', require('./tasksRoutes'));

module.exports = router;
