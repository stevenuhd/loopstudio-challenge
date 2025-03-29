import { render, screen, fireEvent } from "@testing-library/react";
import { CountrySearchBar } from "../CountrySearchBar";
import "@testing-library/jest-dom";

describe("<CountrySearchBar />", () => {
  it("should render the CountrySearchBar", () => {
    render(<CountrySearchBar onSearch={() => {}} />);
    expect(
      screen.getByPlaceholderText(
        "Search Country, Capital City, Region or Subregion"
      )
    ).toBeInTheDocument();
  });

  it("should render the search icon", () => {
    render(<CountrySearchBar onSearch={() => {}} />);
    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
  });

  it("should update the input value when typing", () => {
    render(<CountrySearchBar onSearch={() => {}} />);
    const input = screen.getByPlaceholderText(
      "Search Country, Capital City, Region or Subregion"
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "France" } });
    expect(input.value).toBe("France");
  });

  it("should call onSearch with the correct value when typing", () => {
    const onSearchMock = jest.fn();
    render(<CountrySearchBar onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText(
      "Search Country, Capital City, Region or Subregion"
    );
    fireEvent.change(input, { target: { value: "Germany" } });

    expect(onSearchMock).toHaveBeenCalledWith("Germany");
  });
});
