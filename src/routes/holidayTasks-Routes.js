// routes/holidayTasksRoutes.js
const express = require('express');
const { getAllHolidayTasks, createHolidayTask, updateHolidayTask, deleteHolidayTask } = require('../controllers/holidayTask-Controller');
const isAuthenticated = require('../utils/isAuthenticated'); // Authentication middleware

const router = express.Router();

// Protected Routes
router.get('/HolidayTasks', isAuthenticated, getAllHolidayTasks);  // Requires Authentication
router.post('/HolidayTasks', createHolidayTask); 
router.put('/HolidayTasks/:id', updateHolidayTask); 
router.delete('/HolidayTasks/:id', deleteHolidayTask);  

module.exports = router;
