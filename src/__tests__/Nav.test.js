import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Nav from "../components/Nav";

describe("React App", () => {
  test("Test renders text", () => {
    render(<Nav minimal={false} authToken={false} />);
    const text = screen.getByText("Log in");
    expect(text).toBeInTheDocument();
  });

  test("Test does not render text", () => {
    render(<Nav minimal={true} authToken={false} />);
    const text = screen.queryByText("Log in");
    expect(text).toBeNull();
  });

  test("Renders Correctly", () => {
    const { container } = render(<Nav minimal={false} authToken={false} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
