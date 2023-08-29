import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import axios from "axios";
import rateLimit from "axios-rate-limit";
import WeatherData from "./Weather";

jest.mock("axios");
jest.mock("axios-rate-limit");

describe("WeatherData component", () => {
  it("displays weather data", async () => {
    const mockCurrentResponse = {
      data: {
        current: { temp_f: 72, condition: { text: "Sunny" } },
      },
    };
    const mockForecastResponse = {
      data: {
        forecast: {
          forecastday: [
            {
              day: {
                maxtemp_f: 80,
                mintemp_f: 60,
                condition: { text: "Clear" },
              },
            },
          ],
        },
      },
    };

    // Mock axios and axios-rate-limit responses
    rateLimit.mockReturnValueOnce(jest.fn(() => "Hello!"));
    axios.create.mockResolvedValueOnce("");
    axios.get.mockResolvedValueOnce(mockCurrentResponse);
    axios.get.mockResolvedValueOnce(mockForecastResponse);
    const http = jest.fn()
    http.mockResolvedValueOnce(mockCurrentResponse);
    http.mockResolvedValueOnce(mockForecastResponse);
    render(<WeatherData http={ http }/>);

    // Wait for loading text to disappear
    await waitForElementToBeRemoved(() =>
      screen.queryByText("Loading weather forecast...")
    );

    // Check for specific weather details
    expect(screen.getByText("72°F Sunny", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("80°F/60°F Clear", { exact: false })).toBeInTheDocument();
  });
});
