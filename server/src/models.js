const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Physician = sequelize.define('Physician', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Patient = sequelize.define('Patient', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  physicianId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Physician.hasMany(Patient, { foreignKey: 'physicianId' });
Patient.belongsTo(Physician, { foreignKey: 'physicianId' });

module.exports = { Physician, Patient };
