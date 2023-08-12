import { useEffect } from "react";
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";

import { loadCity } from "./cities.jsx";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  return { q };
}

export async function action({ request, params }) {
  // let formData = await request.formData();
  // console.log("Root", formData);
  const cityWeather = await loadCity()
  console.log("Root", cityWeather);

  console.log(cityWeather.city);
  // return redirect(`/cities/${cityWeather.id}`);
  return null;
}

export default function Root() {
  const { q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>Clear Weather</h1>
        <div>
          <form id="search-form" role="search">
            <label htmlFor="q">Search cities:</label>
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search cities"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onSubmit={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">Submit</button>
          </Form>
        </div>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet q={q} />
      </div>
    </>
  );
}
