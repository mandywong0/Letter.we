const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateAccessToken } = require('../utils/authUtils');

const registerUser = async (req, res) => {
  try {
    let { username, password, email } = req.body;

    // Basic validation, can make it more detailed later
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Username, email, and password are required" });
    }

    // --- Simple sanitization ---
    username = username.trim();
    email = email.trim().toLowerCase();

     // --- Check if user/email already exists ---
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //store user info to db
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email
    });

    //generate a JWT
    const token = generateAccessToken(newUser.id);

    res.json({ 
      token,
      user: {
        username: newUser.username,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser };