const express = require("express");
const { getCurrentUser } = require("../controllers/usersController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", authenticateToken, getCurrentUser);

module.exports = router;