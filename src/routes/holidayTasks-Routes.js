const express = require('express');
const { getAllHolidayTasks, createHolidayTask } = require('../controllers/holidayTask-Controller'); // Ensure correct import

const router = express.Router();

// Define the routes
router.get('/HolidayTasks', getAllHolidayTasks);
router.post('/HolidayTasks', createHolidayTask);

module.exports = router;
