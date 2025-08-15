const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /auth/register
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
