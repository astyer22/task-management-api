// routes/holidayTasksRoutes.js
const express = require('express');
const { getAllHolidayTasks, createHolidayTask, updateHolidayTask, deleteHolidayTask } = require('../controllers/holidayTask-Controller');
const isAuthenticated = require('../utils/isAuthenticated'); // Authentication middleware

const router = express.Router();

// Protected Routes
router.get('/holidayTasks', isAuthenticated, getAllHolidayTasks);  // Requires Authentication
router.post('/holidayTasks', createHolidayTask); 
router.put('/holidayTasks/:id', updateHolidayTask); 
router.delete('/holidayTasks/:id', deleteHolidayTask);  

module.exports = router;
