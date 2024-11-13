const express = require('express');
const { generateWorkout } = require('../controllers/workoutController');
const router = express.Router();

router.post('/generate', generateWorkout);

module.exports = router;
