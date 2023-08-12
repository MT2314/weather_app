import React from 'react';

const Weather = ({ city, temperature, description }) => {
  if (!city || !temperature || !description) {
    return <p>Loading weather data...</p>;
  }
console.log("weather")
  return (
    <div className="weather-container">
      <h1>Welcome to the Weather App</h1>
      <p>Here's the current weather for {city}:</p>
      <p>Temperature: {temperature}°C</p>
      <p>Description: {description}</p>
    </div>
  );
};

export default Weather;
