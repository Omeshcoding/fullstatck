const express = require('express');
const app = express();

app.use(express.json());
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
  res.json(phonebook);
});
app.get('/info', (req, res) => {
  const noOfPeople = Math.max(...phonebook.map((p) => p.id));
  const currentTime = new Date().toString();
  res.send(`<p>Phonebook has info for ${noOfPeople} people</br> ${currentTime}</p>
 `);
  console.log(1);
});
// singlePerson
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = phonebook.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.statusMessage = 'Current person is not on the Phonebook';
    res.status(404).end();
  }
});
// deletePerson
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  phonebook = phonebook.filter((person) => person.id !== id);
  res.status(204).end();
});
// Adding persons
const generateRandomId = () => {
  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  return randomNumber;
};

app.post('/api/persons', (req, res) => {
  const body = req.body;
  if (body.name === '') {
    return res.status(400).json({ error: 'name missing' });
  }
  if (!body.number) {
    return res.status(400).json({ error: 'number missing' });
  }
  const filterName = phonebook.find((persons) => {
    return persons.name === body.name;
  });
  if (filterName) {
    return res.status(400).json({ error: 'name already exists' });
  } else {
    const person = {
      name: body.name,
      number: body.number,
      id: generateRandomId(),
    };

    phonebook = phonebook.concat(person);
    return res.json(person);
  }
});

app.listen(3002, () => {
  console.log(`Server running on port 3002`);
});
