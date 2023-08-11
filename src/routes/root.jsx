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

import { getCities, createCity } from "../cities.jsx";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const cities = await getCities(q);
  return { cities, q };
}

export async function action() {
  const city = await createCity();
  return redirect(`/cities/${city.id}/edit`);
}

export default function Root() {
  const { cities, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router cities</h1>
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
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching}  />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {cities.length ? (
            <ul>
              {cities.map((city) => (
                <li key={city.id}>
                  <NavLink
                    to={`cities/${city.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {city.first || city.last ? (
                      <>
                        {city.first} {city.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {city.favorite && <span aria-label="Favorite">★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p tabIndex="0">
              <i>No cities</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
