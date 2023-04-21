import { useState, useEffect } from 'react';
import axios from 'axios';
import CountryDetails from './components/CountryDetails';

const App = () => {
  const [value, setValue] = useState('');
  const [name, setName] = useState([]);
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const onSearch = (e) => {
    e.preventDefault();
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      const data = response.data;
      return setName(data);
    });
  };
  const countryData = name.filter((person) => {
    if (person.name.common.toUpperCase().includes(value.toUpperCase())) {
      return person.name.common;
    }
  });
  const handleClick = (name) => {
    const country = countryData.find((data) => data.name.common);
    if (name) {
      setShow(!show);
    }
  };
  return (
    <div>
      <form onSubmit={onSearch}>
        find countries <input value={value} onChange={handleChange} />
      </form>
      {countryData.length > 10 && countryData
        ? value && <p>Too many matches, specify another filter</p>
        : countryData.map((data) => {
            const name = data.name.common;
            return (
              <div key={name}>
                <p>
                  {name} <button onClick={() => handleClick(name)}>show</button>
                </p>
              </div>
            );
          })}
      {show && (
        <div>
          {countryData.map((data) => {
            const name = data.name.common;
            const capital = data.capital;
            const area = data.area;
            const languages = data.languages;
            const flag = data.flags.svg;
            const alt = data.flags.alt;
            return (
              <CountryDetails
                key={data.cca3}
                area={area}
                name={name}
                capital={capital}
                languages={languages}
                flag={flag}
                alt={alt}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
export default App;
