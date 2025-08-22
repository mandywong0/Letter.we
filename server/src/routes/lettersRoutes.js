const express = require('express');
const { mailLetter, getLetters } = require('../controllers/lettersController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateToken, mailLetter);
router.get('/', authenticateToken, getLetters);

module.exports = router;
