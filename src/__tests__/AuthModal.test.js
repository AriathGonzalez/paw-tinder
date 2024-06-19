import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthModal from "../components/AuthModal";

describe("React App", () => {
  test("AuthModal Renders Correctly", () => {
    const { container } = render(
      <AuthModal setShowModal={null} isSignUp={true} setIsSignUp={null} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
