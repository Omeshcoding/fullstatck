const PersonForm = ({
  name,
  handleClick,
  handleName,
  handleNumber,
  number,
}) => {
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
        <button type="submit" onClick={handleClick}>
          add
        </button>
      </div>
    </>
  );
};

export default PersonForm;
