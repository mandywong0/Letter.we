const express = require('express');
const { generateCode } = require('../controllers/pairingController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateToken, generateCode);

module.exports = router;
