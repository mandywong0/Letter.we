const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function generateAccessToken(userid) {
  return jwt.sign(userid, process.env.TOKEN_SECRET, { expiresIn: '3600s' }); //think about expiretime
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