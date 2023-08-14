import axios from "axios";

const API_KEY = "ba74bedfc46d79d1a8bc03cbde9297ec"; // Replace with your OpenWeatherMap API key

const getWeather = async (city = "Toronto") => {

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return {
      city: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
    };
  } catch (error) {
    console.error("An error occurred while fetching the weather data:", error);
    throw error;
  }
};

export default getWeather;
