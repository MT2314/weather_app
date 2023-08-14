import axios from "axios";

export async function loadCity(id) {
  let cityWeather = await getWeather(id);
  return cityWeather;
}

const API_KEY = "ba74bedfc46d79d1a8bc03cbde9297ec"; // Replace with your OpenWeatherMap API key

export const getWeather = async (city = "Toronto") => {
  city = city ? city : "Toronto";
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;

  } catch (error) {
    console.error("An error occurred while fetching the weather data:", error);
    throw error;
  }
};
