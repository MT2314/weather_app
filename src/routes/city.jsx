import { useLoaderData, useFetcher } from "react-router-dom";
import { loadCity } from "../data/CityWeather";
import WeatherSection from "../components/WeatherSections"; // Assuming WeatherSection is in the same directory

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
      <div className="weather-container">
        <h1 className="weather-title">{city.name} Weather</h1>
        <p className="weather-description">{city.weather[0].description}</p>

        <div className="accordion" id="weatherAccordion">
          <WeatherSection
            id="temperature"
            title="Temperature"
            icon="bi bi-thermometer-half"
            details={[
              { label: "Current:", value: `${city.main.temp}°C` },
              { label: "Feels Like:", value: `${city.main.feels_like}°C` },
              { label: "Min:", value: `${city.main.temp_min}°C` },
              { label: "Max:", value: `${city.main.temp_max}°C` },
            ]}
          />

          <WeatherSection
            id="wind"
            title="Wind"
            icon="bi bi-wind"
            details={[
              { label: "Speed:", value: `${city.wind.speed} m/s` },
              { label: "Direction:", value: `${city.wind.deg}°` },
            ]}
          />

          <WeatherSection
            id="clouds"
            title="Clouds"
            icon="bi bi-cloud"
            details={[{ label: "Cloudiness:", value: `${city.clouds.all}%` }]}
          />

          <WeatherSection
            id="atmosphere"
            title="Atmosphere"
            icon="bi bi-bar-chart-line"
            details={[
              { label: "Pressure:", value: `${city.main.pressure} hPa` },
              { label: "Humidity:", value: `${city.main.humidity}%` },
            ]}
          />

          <WeatherSection
            id="visibility"
            title="Visibility"
            icon="bi bi-eye"
            details={[
              { label: "Visibility:", value: `${city.visibility} meters` },
            ]}
          />

          <WeatherSection
            id="sun"
            title="Sun"
            icon="bi bi-sunrise"
            details={[
              {
                label: "Sunrise:",
                value: `${new Date(
                  city.sys.sunrise * 1000
                ).toLocaleTimeString()}`,
              },
              {
                label: "Sunset:",
                value: `${new Date(
                  city.sys.sunset * 1000
                ).toLocaleTimeString()}`,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
