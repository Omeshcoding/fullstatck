const PersonForm = ({ name, addContact, handleName, handleNumber, number }) => {
  return (
    <>
      <div>
        name:
        <input value={name} onChange={handleName} />
      </div>
      <div>
        number:
        <input value={number} onChange={handleNumber} />
      </div>
      <div>
        <button type="submit" onClick={(e) => addContact(e, name)}>
          add
        </button>
      </div>
    </>
  );
};

export default PersonForm;
