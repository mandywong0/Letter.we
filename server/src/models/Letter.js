const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const Letter = sequelize.define('Letter', {
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recipient_id: { 
    type: DataTypes.INTEGER,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sent_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
});

// Optional: define associations later

module.exports = Letter;