const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateAccessToken, validatePassword } = require('../utils/authUtils');

const registerUser = async (req, res) => {
  try {
    let { username, password, email } = req.body;

    // Basic validation, can make it more detailed later
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Username, email, and password are required" });
    }

    const errorMsg = validatePassword(password);
    if (errorMsg) {
      return res.status(400).json({ error: errorMsg });
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

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    //validate and sanitize input
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    email = email.trim().toLowerCase();
    password = password.trim();

    //FUTURE: limit login rate

    //find user in DB
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Cannot find user with the credentials you entered" });
    }

    //compare passwords
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return res.status(400).json({ error: "Cannot find user with the credentials you entered" });
    }

    //successfully logged in -- generate JWT
    const token = generateAccessToken(user.id);
    res.json({ 
      token,
      user: {
        username: user.username,
      }
    });

  } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };