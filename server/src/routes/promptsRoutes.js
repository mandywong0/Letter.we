const express = require("express");
const { getDailyPrompt } = require("../controllers/promptsController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticateToken, getDailyPrompt);

module.exports = router;