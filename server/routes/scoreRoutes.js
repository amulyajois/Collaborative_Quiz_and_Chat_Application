const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');

router.post('/add', scoreController.addScore);
router.get('/', scoreController.getLeaderboard);

module.exports = router;
