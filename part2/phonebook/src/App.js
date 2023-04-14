import { useState } from 'react';
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

      <div>
        filter shown with
        <input
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>
      <form>
        <h2>add a new</h2>
        <div>
          name:
          <input
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" onClick={handleClick}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filterByName.map((person, index) => {
        return (
          <div key={index}>
            <p>
              {person.name} {person.number}
            </p>
          </div>
        );
      })}
    </div>
  );
};
export default App;
