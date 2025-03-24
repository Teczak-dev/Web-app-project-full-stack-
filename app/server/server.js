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

// dane zwiazane z wzorem zadania i dodawanie oraz pobieranie zadań
const TaskSchema = new mongoose.Schema({  
  tytul: String,
  opis: String,
  stan_zrobienia: Boolean,
  tablica: String,
  user: String
});
const Task = mongoose.model('tasks', TaskSchema);
app.get('/tasks', async (req, res) => {
  const task = await Task.find();
  res.json(task);
});
app.post('/tasks', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});
app.post('/tasks/delete', async (req, res) => {
  res.json(await Task.deleteOne({ tytul
    : req.body.tytul, tablica: req.body.tablica }));
});
app.post('/tasks/update', async(req, res)=>{
  const updatedTask = await Task.findOneAndUpdate(
    { tytul: req.body.tytul, tablica: req.body.tablica, user: req.body.user },
    {
      $set: {
        opis: req.body.opis,
        stan_zrobienia: req.body.stan_zrobienia,
        tablica: req.body.tablica
      }
    },
    { new: true } 
  );

  if (!updatedTask) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json(updatedTask);
});


// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
