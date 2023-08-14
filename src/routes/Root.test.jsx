import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route } from "react-router-dom";
import Root from "./root"; // Adjust the import path as needed

test("renders Clear Weather title", () => {
  render(<Root />);
  const titleElement = screen.getByText(/Clear Weather/i);
  expect(titleElement).toBeInTheDocument();
});

test("navigates to the correct city on form submission", () => {
  let testLocation;
  render(<Root />);

  // Fill in the search input
  userEvent.type(screen.getByPlaceholderText("Search"), "Toronto");

  // Submit the form
  fireEvent.click(screen.getByText("Submit"));

  // Check that the navigation occurred to the expected path
  expect(testLocation.pathname).toBe("/city/Toronto");
});
