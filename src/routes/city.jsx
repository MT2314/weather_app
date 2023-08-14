import { useLoaderData, useFetcher } from "react-router-dom";
import { loadCity } from "../data/CityWeather";

export async function loader({ params }) {
  const city = await loadCity(params.cityId);
  if (!city) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { city };
}

export async function action({ request, params }) {
  console.assert(params);
}

export default function City() {
  const { city } = useLoaderData();
  console.log(city);
  return (
    <div id="city">
      <h2> {city.city} </h2>
      <div>
        <h1>{city.name} Weather</h1>
        <p>{city.weather[0].description}</p>
        <div>
          <strong>Temperature:</strong> {city.main.temp}°C
          <br />
          <strong>Feels Like:</strong> {city.main.feels_like}°C
          <br />
          <strong>Min Temperature:</strong> {city.main.temp_min}°C
          <br />
          <strong>Max Temperature:</strong> {city.main.temp_max}°C
        </div>
        <div>
          <strong>Wind Speed:</strong> {city.wind.speed} m/s
          <br />
          <strong>Wind Direction:</strong> {city.wind.deg}°
        </div>
        <div>
          <strong>Cloudiness:</strong> {city.clouds.all}%
        </div>
        <div>
          <strong>Pressure:</strong> {city.main.pressure} hPa
          <br />
          <strong>Humidity:</strong> {city.main.humidity}%
        </div>
        <div>
          <strong>Visibility:</strong> {city.visibility} meters
        </div>
        <div>
          <strong>Sunrise:</strong>{" "}
          {new Date(city.sys.sunrise * 1000).toLocaleTimeString()}
          <br />
          <strong>Sunset:</strong>{" "}
          {new Date(city.sys.sunset * 1000).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
