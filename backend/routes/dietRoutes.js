const express = require('express');
const { generateDiet } = require('../controllers/dietController');
const router = express.Router();

router.post('/generate', generateDiet);

module.exports = router;
