import { useEffect, useState } from "react";
import {
  Outlet,
  useLoaderData,
  Form,
  useNavigation,
  useNavigate,
} from "react-router-dom";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  // You could load city information here based on the query 'q'
  return { q };
}
export default function Root() {
  const { q } = useLoaderData();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const city = formData.get("city");
    navigate(`/city/${city}`);
  };

  return (
    <>
      <div id="topbar" className="topbar">
        <h1 className="topbar-title">Clear Weather</h1>
        <div className="search-bar">
          <Form method="post" onSubmit={handleSubmit} className="search-form">
            <label htmlFor="q" className="search-label" hidden>
              Search cities:
            </label>
            <input
              id="q"
              className={`search-input ${searching ? "loading" : ""}`}
              aria-label="Search cities"
              placeholder="Search city"
              type="search"
              name="city"
              defaultValue={q}
            />
            <div
              id="search-spinner"
              className="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <button type="submit" className="search-button">
              Submit
            </button>
          </Form>
        </div>
      </div>
      <div
        id="detail"
        className={`detail-container ${
          navigation.state === "loading" ? "loading" : ""
        }`}
      >
        <Outlet q={q} />
      </div>
    </>
  );
}
