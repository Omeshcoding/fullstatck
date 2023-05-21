require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/phonebook');

// Error Handling
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'castError') {
    return response.status(400).send({ error: 'malformatting id' });
  }
  next(error);
};

app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
app.use(cors());
app.use(express.static('build'));

morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((person) => {
    res.json(person);
  });
});
app.get('/info', async (req, res) => {
  const count = await Person.countDocuments({});
  const currentTime = new Date().toString();
  if (count) {
    res.send(
      `<p>Phonebook has info for ${count} people</br> ${currentTime}</p> `
    );
  } else {
    res.status(404).end();
  }
});
// singlePerson
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});
// deletePerson
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

//Post
app.post('/api/persons', (req, res, next) => {
  console.log(req.body);
  const body = req.body;
  if (body.name === '') {
    return res.status(400).json({ error: 'name missing' });
  }
  if (!body.number) {
    return res.status(400).json({ error: 'number missing' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((savedContact) => {
      res.json(savedContact);
    })
    .catch((error) => next(error));
});
// Update
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log('Server running on port 4000');
});
