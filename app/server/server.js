require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
// port nie ruszać bo zabiję ;-;
const PORT = process.env.PORT || 5001;

// Połączenie z MongoDB
mongoose.connect('mongodb://localhost:27017/TM')
    .then(() => console.log("✅ Połączono z MongoDB"))
    .catch(err => console.log("❌ Błąd połączenia z MongoDB", err));

// dane zwiazane z wzorem uzytkownika i dodawanie oraz pobieranie uzytkownikow
const UserSchema = new mongoose.Schema({
    imie: String,
    login: String,
    haslo: String,
    id: Number
});
const User = mongoose.model('users', UserSchema);
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});
app.post('/users', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

// dane zwiazane z wzorem tablicy i dodawanie oraz pobieranie tablic
const TablicaSchema = new mongoose.Schema({  
  nazwa: String,
  user: String,
});
const Tablica = mongoose.model('tables', TablicaSchema);
app.get('/tables', async (req, res) => {
  const tablice = await Tablica.find();
  res.json(tablice);
});
app.post('/tables', async (req, res) => {
  const newTablica = new Tablica(req.body);
  await newTablica.save();
  res.json(newTablica);
});
app.post('/tables/delete', async (req, res) => {
  res.json(await Tablica.deleteOne({ nazwa
    : req.body.nazwa }));
});


// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
