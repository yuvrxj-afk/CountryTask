import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import CountryDetails from "../components/CountryDetails";
const mockAxios = new MockAdapter(axios);

describe("CountryDetails component", () => {
  const fakeCountryData = {
    name: {
      common: "Fake Country",
      official: "Fake Republic",
    },
    capital: "New Delhi",
    population: 1000000,
    latlng: [12.34, 56.78],
    flags: {
      png: "fake-image-url",
    },
  };

  //   const fakeWeatherData = {
  //     temp_c: 25,
  //     condition: {
  //       text: "Clear",
  //       icon: "fake-icon",
  //     },
  //     wind_dir: "NW",
  //     wind_kph: 10,
  //     wind_mph: 6,
  //   };

  beforeEach(() => {
    mockAxios.reset();
  });

  test("renders CountryDetails component with country data", async () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/details/:countryname", state: [fakeCountryData] },
        ]}
      >
        <CountryDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Fake Country/i)).toBeInTheDocument();
      expect(screen.getByAltText(/Country Flag/i)).toBeInTheDocument();
      expect(screen.getByText(/New Delhi/i)).toBeInTheDocument();
      expect(screen.getByText(/1000000/i)).toBeInTheDocument();
      expect(screen.getByText(/12.34/i)).toBeInTheDocument();
      expect(screen.getByText(/56.78/i)).toBeInTheDocument();
    });
  });

  test("Go back", () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/country", state: [fakeCountryData] }]}
      >
        <CountryDetails />
      </MemoryRouter>
    );
    const backButton = screen.getByText(/Go Back/i);
    fireEvent.click(backButton);
    expect(window.location.pathname).toBe("/");
  });
  test("weather button", () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/country", state: [fakeCountryData] }]}
      >
        <CountryDetails />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText(/Find Capital Weather/i));
    expect(screen.queryByText(/Find Capital Weather/i)).not.toBeInTheDocument();
  });
});
