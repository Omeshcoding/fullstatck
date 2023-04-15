import { useState } from 'react';
import Filter from '../src/components/Filter';
import Persons from '../src/components/Persons';
import PersonForm from '../src/components/PersonForm';
const App = () => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);

  const handleSearch = (e) => setSearchName(e.target.value);
  const handleName = (e) => setNewName(e.target.value);
  const handleNumber = (e) => setNewNumber(e.target.value);

  const handleClick = (e) => {
    e.preventDefault();
    const newContact = {
      name: newName,
      number: newNumber,
    };
    persons.map((person) => {
      if (person.name === newContact.name) {
        setPersons(persons);
      } else {
        setPersons([...persons, newContact]);
      }
    });
    setNewName('');
    setNewNumber('');
    return alert(`${newName} is already added to phonebook`);
  };

  const filterByName = persons.filter((person) => {
    if (person.name.toUpperCase().includes(searchName.toUpperCase())) {
      return person.name;
    }
  });

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchName={searchName} handleSearch={handleSearch} />

      <form>
        <h3>add a new</h3>
        <PersonForm
          name={newName}
          handleName={handleName}
          number={newNumber}
          handleNumber={handleNumber}
          handleClick={handleClick}
        />
      </form>
      <h3>Numbers</h3>
      {filterByName.map((person, index) => {
        return (
          <Persons name={person.name} number={person.number} key={index} />
        );
      })}
    </div>
  );
};
export default App;
