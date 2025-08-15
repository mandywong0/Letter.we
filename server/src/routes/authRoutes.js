const express = require('express');
const { registerUser } = require('../controllers/authController.js')

const router = express.Router();

// POST /auth/register
router.post('/register', registerUser);

module.exports = router;
