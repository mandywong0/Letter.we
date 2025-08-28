const express = require('express');
const { generateCode, pairWithCode } = require('../controllers/pairingController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateToken, generateCode);
router.post('/pair', authenticateToken, pairWithCode);

module.exports = router;
