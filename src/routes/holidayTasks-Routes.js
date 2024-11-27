// routes/holidayTasksRoutes.js
const express = require('express');
const { getAllHolidayTasks, createHolidayTask, updateHolidayTask, deleteHolidayTask } = require('../controllers/holidayTask-Controller');
const isAuthenticated = require('../utils/isAuthenticated'); // Authentication middleware

const router = express.Router();

// Protected Routes
router.get('/', getAllHolidayTasks);  // Requires Authentication
router.post('/', createHolidayTask); 
router.put('/:id', updateHolidayTask); 
router.delete('/:id', deleteHolidayTask);  

module.exports = router;
