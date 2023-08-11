import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getCity, updateCity } from "../cities";
import placeHolder from "../assets/images/placeholder.png";

export async function loader({ params }) {
  const city = await getCity(params.cityId);
  if (!city) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { city };
}

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateCity(params.cityId, {
    favorite: formData.get("favorite") === "true",
  });
}

export default function City() {
  const { city } = useLoaderData();

  return (
    <div id="city">
      <header>
        <div>
          <img
            key={city?.avatar}
            src={city?.avatar || placeHolder}
            alt={`${city?.first} ${city?.last}'s avatar`}
          />
        </div>
      </header>
      <main>
        <h1>
          {city?.first || city?.last ? (
            <>
              {city?.first} {city?.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite city={city} />
        </h1>

        {city?.twitter && (
          <p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://twitter.com/${city?.twitter}`}
            >
              {city?.twitter}
            </a>
          </p>
        )}

        {city?.notes && <p>{city?.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit" aria-label="Edit city">
              Edit
            </button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" aria-label="Delete city">
              Delete
            </button>
          </Form>
        </div>
      </main>
    </div>
  );
}

function Favorite({ city }) {
  const fetcher = useFetcher();
  let favorite = city?.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
