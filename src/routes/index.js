const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/holidayTask-Routes', require('./holidayTask-Routes'));
router.use('/tasksRoutes', require('./tasksRoutes'));

module.exports = router;