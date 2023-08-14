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

const weatherImages = {
  "clear sky":
    "https://i.gifer.com/XFbw.gif",
  "few clouds":
    "https://i.gifer.com/Lx0q.gif",
  "scattered clouds":
    "https://i.gifer.com/QuQ9.gif",
  "broken clouds":
    "https://i.gifer.com/QuQ9.gi",
  "overcast clouds":
    "https://i.gifer.com/QuQ9.gi",
  "shower rain":
    "https://media4.giphy.com/media/qHWAmPd3SWyY0/giphy.gif?cid=ecf05e47bzzk6wmlrqf2pgwex5a4klunitf5xqjkv3wvi82g&ep=v1_gifs_related&rid=giphy.gif&ct=g",
  rain: "https://media4.giphy.com/media/26DMWExfbZSiV0Btm/giphy.gif?cid=ecf05e47o1350m4fqc3a3v3d1o1yxpwd0lif7vr9ewxalwqf&ep=v1_gifs_related&rid=giphy.gif&ct=g",
  thunderstorm:
    "https://i.gifer.com/BQS7.gif",
  snow: "https://media2.giphy.com/media/WoRqq91KnOuM8/giphy.gif?cid=ecf05e4794uwgejqlxo4gvwvn7vu4ta3lbgnzcsmev17xdb4&ep=v1_gifs_related&rid=giphy.gif&ct=g",
  mist: "https://media4.giphy.com/media/McDhCoTyRyLiE/giphy.gif?cid=ecf05e47nfc0l9flgrd53vjdatsp15swdxfywjrdmvyk4epw&ep=v1_gifs_search&rid=giphy.gif&ct=g",
};

export default function City() {
  const { city } = useLoaderData();
  console.log(city);
  const weatherDescription = city.weather[0].description; // Assuming `weather` is the weather data from the API
  const imageUrl = weatherImages[weatherDescription];
  return (
    <div id="city">
      <div className="weather-container">
        <h1 className="weather-title">{city.name} Weather</h1>
        <p className="weather-description">{city.weather[0].description}</p>
        <div
          className="section-container"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        >
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
