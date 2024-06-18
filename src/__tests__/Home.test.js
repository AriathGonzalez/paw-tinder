import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../pages/Home";

describe("React App", () => {
  test("Test renders text", () => {
    render(<Home />);
    const text = screen.getByText("Swipe Right®");
    expect(text).toBeInTheDocument();
  });

  test("Renders Correctly", () => {
    const { container } = render(<Home />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
