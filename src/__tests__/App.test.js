import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper: BrowserRouter });
};

describe("App Component", () => {
  test("renders Home component at default route", () => {
    renderWithRouter(<App />);

    // TODO: Add a specific element from the Home component to check
    expect(screen.getByText(/home page/i)).toBeInTheDocument();
  });

  test("renders Dashboard component at /dashboard route", () => {
    renderWithRouter(<App />, { route: "/dashboard" });

    // TODO: Add a specific element from the Dashboard component to check
    expect(screen.getByText(/dashboard page/i)).toBeInTheDocument();
  });

  test("renders Onboarding component at /onboarding route", () => {
    renderWithRouter(<App />, { route: "/onboarding" });

    // TODO: Add a specific element from the Onboarding component to check
    expect(screen.getByText(/onboarding page/i)).toBeInTheDocument();
  });
});
