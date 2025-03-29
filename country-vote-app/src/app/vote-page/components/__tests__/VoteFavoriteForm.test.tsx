import { render, screen, fireEvent } from "@testing-library/react";
import VoteFavoriteForm from "../VoteFavoriteForm";
import useVoteForm from "../../../../hooks/useVoteForm";
import { MOCK_COUNTRIES } from "@/src/mocks/countries";

jest.mock("../../../../hooks/useVoteForm");

describe("<VoteFavoriteForm />", () => {
  let mockUseVoteForm: jest.MockedFunction<typeof useVoteForm>;

  beforeEach(() => {
    mockUseVoteForm = useVoteForm as jest.MockedFunction<typeof useVoteForm>;
    mockUseVoteForm.mockReturnValue({
      formState: {
        name: "",
        email: "",
        selectedCountry: "",
        touched: {
          name: false,
          email: false,
          country: false,
        },
      },
      errors: {
        name: "",
        email: "",
        country: "",
      },
      isValid: false,
      submitted: false,
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      handleSubmit: jest.fn((e) => e.preventDefault()),
    });
  });

  it("should renders the form correctly", () => {
    render(<VoteFavoriteForm />);

    expect(screen.getByText("Vote Your Favorite Country")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByText("Select a Country")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit vote/i })).toBeDisabled();
  });

  it("should displays validation errors when fields are touched and invalid", () => {
    mockUseVoteForm.mockReturnValueOnce({
      ...mockUseVoteForm(),
      formState: {
        ...mockUseVoteForm().formState,
        touched: {
          name: true,
          email: true,
          country: true,
        },
      },
      errors: {
        name: "Name is required",
        email: "Invalid email",
        country: "Country selection is required",
      },
    });

    render(<VoteFavoriteForm />);

    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
    expect(
      screen.getByText("Country selection is required")
    ).toBeInTheDocument();
  });

  it("should calls handleChange on user input", () => {
    render(<VoteFavoriteForm />);

    const nameInput = screen.getByPlaceholderText("Name") as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
    const countrySelect = screen.getByRole("combobox");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(countrySelect, {
      target: { value: MOCK_COUNTRIES[0].name },
    });

    expect(mockUseVoteForm().handleChange).toHaveBeenCalledTimes(3);
    expect(mockUseVoteForm().handleChange).toHaveBeenCalledWith(
      "name",
      "John Doe"
    );
    expect(mockUseVoteForm().handleChange).toHaveBeenCalledWith(
      "email",
      "john@example.com"
    );
    expect(mockUseVoteForm().handleChange).toHaveBeenCalledWith(
      "selectedCountry",
      MOCK_COUNTRIES[0].name
    );
  });

  it("should enables the submit button when the form is valid", () => {
    mockUseVoteForm.mockReturnValueOnce({
      ...mockUseVoteForm(),
      isValid: true,
    });

    render(<VoteFavoriteForm />);

    expect(screen.getByRole("button", { name: /submit vote/i })).toBeEnabled();
  });

  it("should calls handleSubmit when form is submitted", () => {
    mockUseVoteForm.mockReturnValueOnce({
      ...mockUseVoteForm(),
      isValid: true,
    });

    render(<VoteFavoriteForm />);

    const submitButton = screen.getByRole("button", { name: /submit vote/i });
    fireEvent.click(submitButton);

    expect(mockUseVoteForm().handleSubmit).toHaveBeenCalled();
  });

  it("shoulddisplays success message after successful submission", () => {
    mockUseVoteForm.mockReturnValueOnce({
      ...mockUseVoteForm(),
      submitted: true,
    });

    render(<VoteFavoriteForm />);

    expect(
      screen.getByText("Your vote was successfully submitted")
    ).toBeInTheDocument();
    expect(screen.getByRole("icon", { hidden: true })).toBeInTheDocument(); // IoCheckmarkCircleOutline icon
  });
});
