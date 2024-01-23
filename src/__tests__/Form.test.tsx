import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Form from "../components/Form";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

const MockForm = () => {
  return (
    <BrowserRouter>
      <Form />
    </BrowserRouter>
  );
};

describe("Form component", () => {
  test("renders form without errors", () => {
    render(<MockForm />);
    const submitButton = screen.getByRole("button", { name: /search/i });

    const inputField = screen.getByLabelText("Enter country");
    expect(submitButton).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
  });

  describe("validation checks", () => {
    test("only accepts non-empty values", () => {
      render(<MockForm />);

      const inputField = screen.getByLabelText("Enter country");
      fireEvent.change(inputField, { target: { value: "" } });
      expect(inputField).toHaveValue("");
      fireEvent.change(inputField, { target: { value: "India" } });
      expect(inputField).toHaveValue("India");
    });

    test("submit button is disabled when input field is empty", () => {
      render(<MockForm />);

      const submitButton = screen.getByRole("button", { name: /search/i });
      const inputField = screen.getByLabelText("Enter country");
      expect(submitButton).toBeDisabled();
      fireEvent.change(inputField, { target: { value: "India" } });
      expect(submitButton).not.toBeDisabled();
    });
  });
});

describe("Form : API", () => {
  test("submit form Successfully", async () => {
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    );
    const searchInput = getByLabelText("Enter country");
    const searchButton = getByText("Search");
    fetchMock.mockResponseOnce(JSON.stringify({}));
    fireEvent.change(searchInput, { target: { value: "india" } });
    await act(async () => {
      fireEvent.click(searchButton);
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://restcountries.com/v3.1/name/india?fullText=true"
    );
  });
  test("Does not submit form successfully", async () => {
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    );
    const searchInput = getByLabelText("Enter country");
    const searchButton = getByText("Search");
    fetchMock.mockResponseOnce(
      JSON.stringify({ status: 404, message: "Not Found" })
    );
    fireEvent.change(searchInput, { target: { value: "unknown" } });
    await act(async () => {
      fireEvent.click(searchButton);
    });
    // expect(getByText("Not Found")).toBeInTheDocument();
  });
});
