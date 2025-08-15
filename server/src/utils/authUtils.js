const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function generateAccessToken(userid) {
  return jwt.sign(userid, process.env.TOKEN_SECRET, { expiresIn: '3600s' }); //think about expiretime
}

module.exports = { generateAccessToken };