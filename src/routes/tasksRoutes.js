const express = require('express');
const { getAllTasks, createTask } = require('../controllers/taskController'); // Ensure correct import

const router = express.Router();

// Define the routes
router.get('/Tasks', getAllTasks);
router.post('/Tasks', createTask);



module.exports = router;
