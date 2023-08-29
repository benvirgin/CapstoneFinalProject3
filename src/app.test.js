import React from "react";
import { render, screen } from "@testing-library/react";
import assert from "assert";
import { ErrorBoundary } from "./App";
import Home from "./Home";

describe("App component", () => {

  it("diplays the right text when user is logged out", () => {
    render(<Home />);
    expect(screen.getByText((content) => {
      return content.includes("You're logged out");
    })).toBeInTheDocument();
  });

  it("handles error boundary", () => {
    const ErrorThrowingComponent = () => {
      throw new Error("Test Error");
    };

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    const errorText = screen.getByText(/something went wrong/i);
    assert.ok(errorText, "Error boundary should catch errors");
  });
});