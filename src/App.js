import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [city, setCity] = useState('Paris')
  const [temperature, setTemperature] = useState(0)
  const [loading, setLoading] = useState(false)

  function selectCity(cityName, latitude, longitude) {
    setLoading(true)
    setCity(cityName)


    axios.get('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m')
      .then(data => {
        const temperatureValue = data.data.current.temperature_2m
        setTemperature(temperatureValue)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <h1>My Weather App</h1>

      <div>
        <button onClick={() => { selectCity('Kochi', 9.93, 76.26) }}>Kochi</button>
        <button onClick={() => { selectCity('Kottayam', 9.59, 76.52) }}>Kottayam</button>
        <button onClick={() => { selectCity('Alapuzha', 9.49, 76.33) }}>Alapuzha</button>
      </div>

      {loading? <p>Loding..</p> : <p>The current temperature at <span id='city'>{city}</span> is &nbsp;&nbsp;<span id='degree'>{temperature}°C</span></p>}
    </div>
  );
}

export default App;
