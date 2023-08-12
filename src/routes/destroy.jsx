import { redirect } from "react-router-dom";
import { deleteCity } from "./cities";

export async function action({ params }) {
  await deleteCity(params.cityId);
  return redirect("/");
}