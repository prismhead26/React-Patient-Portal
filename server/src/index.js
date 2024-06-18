const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('./database');
const { Physician, Patient } = require('./models');

const app = express();
const PORT = 3001;
const SECRET_KEY = 'your_secret_key'; // Replace with a secure key in production

app.use(express.json());

// Authentication routes
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const physician = await Physician.create({ name, email, password: hashedPassword });
    res.json(physician);
  } catch (error) {
    res.status(400).json({ error: 'Email already in use' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const physician = await Physician.findOne({ where: { email } });
  if (physician && (await bcrypt.compare(password, physician.password))) {
    const token = jwt.sign({ id: physician.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Middleware to authenticate the token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Patient management routes
app.get('/physicians', async (req, res) => {
  const physicians = await Physician.findAll();
  res.json(physicians);
});

app.get('/mypatients', authenticateToken, async (req, res) => {
  const patients = await Patient.findAll({ where: { physicianId: req.user.id } });
  res.json(patients);
});

app.post('/patients', authenticateToken, async (req, res) => {
  const { name } = req.body;
  const patient = await Patient.create({ name, physicianId: req.user.id });
  res.json(patient);
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
