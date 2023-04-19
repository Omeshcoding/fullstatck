import { useState, useEffect } from 'react';
import axios from 'axios';
import contactService from './services/contact';

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

  const addContact = (e, name) => {
    e.preventDefault();
    const newContact = {
      name: newName,
      number: newNumber,
    };
    if (newContact.name && newContact.number) {
      const person = persons.find((person) => person.name === name);
      const changeNumber = { ...person, number: newNumber };
      if (person) {
        axios
          .put(`http://localhost:3003/persons/${person.id}`, changeNumber)
          .then((response) => response.data);
        setNewName('');
        setNewNumber('');
      } else {
        contactService.create(newContact).then((returnedData) => returnedData);
        setNewName('');
        setNewNumber('');
      }

      return alert(`${newName} is already added to phonebook`);
    }
  };

  const filterByName = persons.filter((person) => {
    if (person.name.toUpperCase().includes(searchName.toUpperCase())) {
      return person.name;
    }
  });

  const deleteNumber = (id, name) => {
    const newContact = persons.filter((person) => person.id !== id);
    contactService.deleteContact(id).then((response) => {
      window.confirm(`Delete ${name}`) && setPersons(newContact);
    });
  };

  useEffect(() => {
    contactService.getAll().then((initialData) => {
      setPersons(initialData);
    });
  }, [newNumber]);

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
          addContact={addContact}
        />
      </form>
      <h3>Numbers</h3>
      {filterByName.map((person, index) => {
        return (
          <Persons
            name={person.name}
            number={person.number}
            key={index}
            id={person.id}
            deleteNumber={deleteNumber}
          />
        );
      })}
    </div>
  );
};
export default App;
