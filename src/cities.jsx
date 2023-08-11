import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getCities(query) {
  await fakeNetwork(`getCities:${query}`);
  let cities = await localforage.getItem("cities");
  if (!cities) cities = [];
  if (query) {
    cities = matchSorter(cities, query, { keys: ["first", "last"] });
  }
  return cities.sort(sortBy("last", "createdAt"));
}

export async function createCity() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let city = { id, createdAt: Date.now() };
  let cities = await getCities();
  cities.unshift(city);
  await set(cities);
  return city;
}

export async function getCity(id) {
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
