import { Form, useLoaderData } from "react-router-dom";
import { getCity } from "../cities";
import placeHolder from "../assets/images/placeholder.png";

export async function loader({ params }) {
  const city = await getCity(params.cityId);
  return { city };
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
                !window.confirm("Please confirm you want to delete this record.")
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
  // yes, this is a `let` for later
  let favorite = city?.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
