require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;

// Połączenie z MongoDB
mongoose.connect('mongodb://localhost:27017/TM')
    .then(() => console.log("✅ Połączono z MongoDB"))
    .catch(err => console.log("❌ Błąd połączenia z MongoDB", err));

// Model użytkownika
const UserSchema = new mongoose.Schema({
    imie: String,
    login: String,
    haslo: String,
    id: Number
});
const User = mongoose.model('users', UserSchema);

// Endpointy API
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
