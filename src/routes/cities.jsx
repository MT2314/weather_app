import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import {getWeather} from "../data/getWeather.js";



export async function loadCity(id) {
  console.log("loaded city",id);
  // await fakeNetwork(`city:${id}`);
  // await getWeather(`getCities:${query}`);
  // let cities = await localforage.getItem("cities");
  // if (!cities) cities = [];
  // if (query) {
  //   cities = matchSorter(cities, query, { keys: ["first", "last"] });
  // }
  let cityWeather = await getWeather(id);
  return cityWeather;
}

export async function request(id) {
  await fakeNetwork(`city:${id}`);
  let cities = await localforage.getItem("cities");
  let city = cities.find((city) => city.id === id);
  return city ?? null;
}

export async function updateCity(id, updates) {
  await fakeNetwork();
  let cities = await localforage.getItem("cities");
  let city = cities.find((city) => city.id === id);
  if (!city) throw new Error("No city found for", id);
  Object.assign(city, updates);
  await set(cities);
  return city;
}

export async function deleteCity(id) {
  console.log("Deleting city");
  let cities = await localforage.getItem("cities");
  let index = cities.findIndex((city) => city.id === id);
  if (index > -1) {
    cities.splice(index, 1);
    await set(cities);
    return true;
  }
  return false;
}

function set(cities) {
  return localforage.setItem("cities", cities);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
