const sequelize = require('./database');
const { Physician, Patient } = require('./models');
const bcrypt = require('bcryptjs');

const seed = async () => {
  await sequelize.sync({ force: true }); // This will drop existing tables and re-create them

  const physicians = [
    { name: 'Dr. John Doe', email: 'john@example.com', password: await bcrypt.hash('password', 10) },
    { name: 'Dr. Jane Smith', email: 'jane@example.com', password: await bcrypt.hash('password', 10) },
  ];

  const patients = [
    { name: 'Patient One', physicianId: 1 },
    { name: 'Patient Two', physicianId: 1 },
    { name: 'Patient Three', physicianId: 2 },
    { name: 'Patient Four', physicianId: 2 },
  ];

  await Physician.bulkCreate(physicians);
  await Patient.bulkCreate(patients);

  console.log('Database seeded!');
};

seed().catch((err) => {
  console.error('Failed to seed database:', err);
});
