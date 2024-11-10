// src/routes/holidayTasks-Routes.js
const express = require('express');
const { getAllHolidayTasks, createHolidayTask, updateHolidayTask, deleteHolidayTask } = require('../controllers/holidayTask-Controller'); // Ensure correct import
const isAuthenticated = require('../utils/isAuthenticated');  // Authentication middleware

const router = express.Router();

// Define the routes
router.get('/HolidayTasks', getAllHolidayTasks);
router.post('/HolidayTasks', createHolidayTask);
router.put('/HolidayTasks/:id', updateHolidayTask);
router.delete('/HolidayTasks/:id', deleteHolidayTask);

module.exports = router;
