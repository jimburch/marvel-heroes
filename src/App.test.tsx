import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the title", () => {
  render(<App />);
  const titleElement = screen.getByText(/Assemble!/i);
  expect(titleElement).toBeInTheDocument();
});
