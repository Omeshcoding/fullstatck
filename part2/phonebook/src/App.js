import { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from '../src/components/Filter';
import Persons from '../src/components/Persons';
import PersonForm from '../src/components/PersonForm';

const App = () => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [persons, setPersons] = useState([]);

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

  useEffect(() => {
    console.log('effect');
    axios.get('http://localhost:3003/persons').then((response) => {
      console.log(response);
      console.log('response fullfilled');
      setPersons(response.data);
    });
  }, []);

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
