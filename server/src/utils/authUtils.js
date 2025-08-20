const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function generateAccessToken(userid) {
  return jwt.sign({ id: userid }, process.env.TOKEN_SECRET, { expiresIn: '1hr' }); //think about expiretime
}

function validatePassword(password) {
  if (password.includes(" ")) {
    return "Password cannot contain spaces";
  }
  if (password.length < 6) {
    return "Password must contain at least 6 characters";
  }
  return null;
}

module.exports = { generateAccessToken, validatePassword };