import { render, screen, fireEvent } from "@testing-library/react";
import { CountryList } from "../CountryList";
import { useFilteredCountries } from "../../../../hooks/useFilteredCountries";
import { usePaginatedCountries } from "../../../../hooks/usePaginatedCountries";
import { useWeather } from "../../../../hooks/useWeather";
// Mock hooks
jest.mock("../../../../hooks/useFilteredCountries", () => ({
  useFilteredCountries: jest.fn(),
}));

jest.mock("../../../../hooks/usePaginatedCountries", () => ({
  usePaginatedCountries: jest.fn(),
}));

jest.mock("../../../../hooks/useWeather", () => ({
  useWeather: jest.fn(),
}));



describe("<CountryList />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render 'No countries found' when the search query returns no results", () => {
    (useFilteredCountries as jest.Mock).mockReturnValue([]);
    (usePaginatedCountries as jest.Mock).mockReturnValue([]);
    (useWeather as jest.Mock).mockReturnValue({ weather: {}, loading: false });

    render(<CountryList searchQuery="xyz" />);
    expect(screen.getByText("No countries found")).toBeInTheDocument();
  });



  it("should shows 'Loading...' in the weather column while fetching weather data", () => {
    const mockCountries = [
      {
        name: "France",
        capital_city: "Paris",
        region: "Europe",
        sub_region: "Western Europe",
        votes: 5,
      },
    ];

    (useFilteredCountries as jest.Mock).mockReturnValue(mockCountries);
    (usePaginatedCountries as jest.Mock).mockReturnValue(mockCountries);
    (useWeather as jest.Mock).mockReturnValue({ weather: {}, loading: true });

    render(<CountryList searchQuery="" />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should navigate between pages when clicking 'Next' and 'Prev'", () => {
    const mockCountries = Array.from({ length: 20 }, (_, i) => ({
      name: `Country ${i + 1}`,
      capital_city: `Capital ${i + 1}`,
      region: "Region",
      sub_region: "Subregion",
      votes: i + 1,
    }));

    (useFilteredCountries as jest.Mock).mockReturnValue(mockCountries);
    (usePaginatedCountries as jest.Mock)
      .mockReturnValueOnce(mockCountries.slice(0, 10)) // First Page
      .mockReturnValueOnce(mockCountries.slice(10, 20)); // Second Page
    (useWeather as jest.Mock).mockReturnValue({ weather: {}, loading: false });

    render(<CountryList searchQuery="" />);

    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Prev"));
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
  });

});
