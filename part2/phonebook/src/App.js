import { useState, useEffect } from 'react';
import axios from 'axios';
import contactService from './services/contact';

import Filter from '../src/components/Filter';
import Persons from '../src/components/Persons';
import PersonForm from '../src/components/PersonForm';
import {
  SuccessNotification,
  ErrorNotification,
} from './components/Notification';

const App = () => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

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
        contactService
          .update(person.id, changeNumber)
          .then((response) => {
            setNotification({ message: `Added ${newName}`, type: 'success' });

            return response.data;
          })
          .catch((error) => {
            setNotification({
              message: `Information of ${newName} has already been removed from server`,
              type: 'error',
            });

            setPersons(persons.filter((p) => p.id !== person.id));
          });
      } else {
        contactService
          .create(newContact)
          .then((returnedData) => {
            setNotification({ message: `Added ${newName}`, type: 'success' });
            return returnedData;
          })
          .catch((error) => {
            console.log(1, newContact.name.length);
            newContact.name.length < 3
              ? setNotification({
                  message: `Please enter a name with more than 3 character`,
                  type: 'error',
                })
              : setNotification({
                  message: `Enter a valid number`,
                  type: 'error',
                });
          });
      }
      setNewName('');
      setNewNumber('');
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 5000);
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
      <h1>Phonebook</h1>
      <Filter searchName={searchName} handleSearch={handleSearch} />
      {notification.type === 'success' && (
        <SuccessNotification
          message={notification.message}
          type={notification.type}
        />
      )}
      {notification.type === 'error' && (
        <ErrorNotification
          message={notification.message}
          type={notification.type}
        />
      )}

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
