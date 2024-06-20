import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Onboarding from "../pages/Onboarding";

describe("React App", () => {
  test("Onboarding Renders Correctly", () => {
    const { container } = render(<Onboarding />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
