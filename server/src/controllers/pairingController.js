const crypto = require("crypto"); 
const User = require('../models/User');

const generateCode = async (req, res) => {
  try {
    const code = crypto.randomInt(100000, 1000000).toString();
    const expires_at = new Date(Date.now() + 15 * 60 * 1000);

    await User.update(
      { pairing_code: code, pairing_code_expires_at: expires_at },
      { where: { id: req.user.id } }
    );

    return res.status(201).json({ code, expires_at });

  } catch (error) {

    console.error("Sequelize Error:", {
      name: error.name,
      message: error.message,
      errors: error.errors || [],
    });

    return res.status(500).json({ error: "Failed to generate code" });
  }
};

module.exports = { generateCode };