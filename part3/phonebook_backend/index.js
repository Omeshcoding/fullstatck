require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/phonebook');

app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
app.use(cors());
app.use(express.static('build'));

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
});
let phonebook = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (req, res) => {
  Person.find({}).then((person) => {
    console.log(1, person);
    res.json(person);
  });
});
app.get('/info', (req, res) => {
  const noOfPeople = Math.max(...phonebook.map((p) => p.id));
  const currentTime = new Date().toString();
  res.send(`<p>Phonebook has info for ${noOfPeople} people</br> ${currentTime}</p>
 `);
});
// singlePerson
app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person);
  });
});
// deletePerson
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  phonebook = phonebook.filter((person) => person.id !== id);
  res.status(204).end();
});

//Post
app.post('/api/persons', (req, res) => {
  console.log(req.body);
  const body = req.body;
  if (body.name === '') {
    return res.status(400).json({ error: 'name missing' });
  }
  if (!body.number) {
    return res.status(400).json({ error: 'number missing' });
  }
  const filterName = Person.find((persons) => {
    return persons.name === body.name;
  });
  if (filterName) {
    return res.status(400).json({ error: 'name already exists' });
  } else {
    const person = new Person({
      name: body.name,
      number: body.number,
    });
    person.save().then((savedContact) => {
      res.json(savedContact);
    });
  }
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port 4000`);
});
