const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const PairingCode = sequelize.define('PairingCode', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  }
});

PairingCode.belongsTo(User, { foreignKey: 'user_id' });

module.exports = PairingCode;