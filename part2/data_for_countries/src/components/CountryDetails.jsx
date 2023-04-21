import React from 'react';

const CountryDetails = ({ name, area, languages, flag, alt, capital }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital} </p>
      <p>area {area} </p>
      <h4>languages :</h4>
      <ul>
        {Object.keys(languages).map((key, index) => {
          return <li key={key}>{languages[key]} </li>;
        })}
      </ul>
      <img src={flag} alt={alt} />
    </div>
  );
};

export default CountryDetails;
