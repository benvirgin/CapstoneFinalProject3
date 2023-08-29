import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";

describe("Navbar component", () => {
  test("all buttons load properly", async () => {
    render(<Router><Navbar isLoggedIn={true} /></Router>);

    const navButtons = await screen.findAllByRole("link");

    expect(navButtons.length).toEqual(3);
  });

  test("all icons load properly", async () => {
    render(<Router><Navbar isLoggedIn={true} /></Router>);

    const navIcons = await screen.findAllByRole("icon");

    expect(navIcons.length).toEqual(2);
  });

  test("dark mode toggle works correctly", () => {
    render(<Router><Navbar isLoggedIn={true} /></Router>);

    const darkModeSwitch = screen.getByLabelText("Dark Mode");

    // Initial state: light mode
    const initialLinkElement = document.getElementById("custom-stylesheet");
    expect(initialLinkElement).toBeNull();

    // Toggle dark mode
    fireEvent.click(darkModeSwitch);

    // Dark mode state: custom stylesheet should be added
    const updatedLinkElement = document.getElementById("custom-stylesheet");
    expect(updatedLinkElement).toBeInTheDocument();

    // Toggle back to light mode
    fireEvent.click(darkModeSwitch);

    const finalLinkElement = document.getElementById("custom-stylesheet");
    expect(finalLinkElement).toBeNull();
  });
});
