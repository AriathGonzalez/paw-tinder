import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Nav from "../components/Nav";

describe("React App", () => {
  test("Test renders Log In text correctly", () => {
    render(
      <Nav
        minimal={false}
        showModal={false}
        setShowModal={null}
        setIsSignUp={null}
      />
    );
    const text = screen.getByText("Log In");
    expect(text).toBeInTheDocument();
  });

  test("Test does not render text", () => {
    render(
      <Nav
        minimal={true}
        showModal={false}
        setShowModal={null}
        setIsSignUp={null}
      />
    );
    const text = screen.queryByText("Log In");
    expect(text).toBeNull();
  });

  test("Nav Renders Correctly", () => {
    const { container } = render(
      <Nav
        minimal={false}
        showModal={false}
        setShowModal={null}
        setIsSignUp={null}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
