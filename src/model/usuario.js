const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Usuario = sequelize.define('Usuario', {
  nome:  { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
}, { tableName: 'usuarios' });

module.exports = Usuario;