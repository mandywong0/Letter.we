const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  partner_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: true
  }
});

// Optional: define associations later
// User.hasMany(Letter, { foreignKey: 'senderId' });
// User.hasMany(Letter, { foreignKey: 'recipientId' });

module.exports = User;
