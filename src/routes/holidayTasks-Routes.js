const express = require('express');
const { getAllHolidayTasks, createHolidayTask, updateHolidayTask, deleteHolidayTask } = require('../controllers/holidayTask-Controller'); // Ensure correct import

const router = express.Router();

// Define the routes
router.get('/HolidayTasks', getAllHolidayTasks);
router.post('/HolidayTasks', createHolidayTask);
router.put('/HolidayTasks/:id', updateHolidayTask);
router.delete('/HolidayTasks/:id', deleteHolidayTask);

module.exports = router;
