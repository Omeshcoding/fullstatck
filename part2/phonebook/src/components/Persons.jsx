const Persons = ({ name, number, deleteNumber, id }) => {
  return (
    <div>
      <p>
        {name} {number}
        <button onClick={() => deleteNumber(id, name)}>delete</button>
      </p>
    </div>
  );
};

export default Persons;
