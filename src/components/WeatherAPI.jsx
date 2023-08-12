import React, { useState, useEffect } from "react";
import Weather from "./WeatherAPI";
import getWeather from "../utilities/getWeather";

const WeatherAPI = () => {
  const [weatherData, setWeatherData] = useState(null);
  // useEffect(() => {
  //   const fetchWeather = async () => {
  //     try {
  //       const data = await getWeather('San Francisco');
  //       setWeatherData(data);
  //     } catch (error) {
  //       console.error('Failed to fetch weather data:', error);
  //     }
  //   };

  //   fetchWeather();
  // }, []);

  return (
    <div className="App">
      {weatherData ? (
        <Weather
          city={weatherData.city ? weatherData.city : "San Francisco"}
          temperature={
            weatherData.temperature ? weatherData.temperature : "San Francisco"
          }
          description={
            weatherData.description ? weatherData.description : "San Francisco"
          }
        />
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherAPI;
