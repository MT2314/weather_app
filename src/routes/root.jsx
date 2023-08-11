import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
} from "react-router-dom";

import { getcities, createCity } from "../cities.jsx";

export async function loader() {
  const cities = await getcities();
  return { cities };
}

export async function action() {
  const city = await createCity();
  return redirect(`/cities/${city.id}/edit`);
}

export default function Root() {
  const { cities } = useLoaderData();
  const navigation = useNavigation();
  return (
    <>
      <div id="sidebar">
        <h1>React Router cities</h1>
        <div>
          <form id="search-form" role="search">
            <label htmlFor="q">Search cities:</label>
            <input
              id="q"
              aria-label="Search cities"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden="true" hidden />
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
