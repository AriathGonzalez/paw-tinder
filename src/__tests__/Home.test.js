import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../pages/Home";

describe("React App", () => {
  test("Test renders Sniff Right® correct", () => {
    render(<Home />);
    const text = screen.getByText("Sniff Right®");
    expect(text).toBeInTheDocument();
  });

  test("Home Renders Correctly", () => {
    const { container } = render(<Home />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
