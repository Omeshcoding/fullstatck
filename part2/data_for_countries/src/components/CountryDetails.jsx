import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetails = ({ id, name, area, languages, flag, alt, capital }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    console.log('hey');
    let apiKey = process.env.REACT_APP_WEATHER_API_ID;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [id]);
  if (!weather) {
    return null;
  }
  let temperature = weather.main.temp;
  let windSpeed = weather.wind.speed;
  let weatherIcon = weather.weather[0].icon;
  const imageUrl =
    ' http://openweathermap.org/img/wn/' + weatherIcon + '@4x.png';
  let weaatherDesc = weather.weather[0].description;
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
      <h2>Weather in {capital}</h2>
      {temperature && <p>temperature {temperature} Celcius</p>}
      <img src={imageUrl} alt={weaatherDesc} />
      <p>wind {windSpeed} m/s </p>
    </div>
  );
};

export default CountryDetails;
