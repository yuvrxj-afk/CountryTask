import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Form from "../components/Form";
import axios from "axios";

import MockAdapter from "axios-mock-adapter";

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

    const inputField = screen.getByPlaceholderText("Enter country");
    expect(submitButton).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
  });

  describe("validation checks", () => {
    test("only accepts non-empty values", () => {
      render(<MockForm />);

      const inputField = screen.getByPlaceholderText("Enter country");
      fireEvent.change(inputField, { target: { value: "" } });
      expect(inputField).toHaveValue("");
      fireEvent.change(inputField, { target: { value: "India" } });
      expect(inputField).toHaveValue("India");
    });

    test("submit button is disabled when input field is empty", () => {
      render(<MockForm />);

      const submitButton = screen.getByRole("button", { name: /search/i });
      const inputField = screen.getByPlaceholderText("Enter country");
      expect(submitButton).toBeDisabled();
      fireEvent.change(inputField, { target: { value: "India" } });
      expect(submitButton).not.toBeDisabled();
    });
  });
});

describe("Form : API", () => {
  const mockAxios = new MockAdapter(axios);
  beforeEach(() => {
    mockAxios.reset();
  });
  test("submit form Successfully", async () => {
    render(<MockForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter country"), {
      target: { value: "India" },
    });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(mockAxios.history);
      expect(mockAxios.history.get[0].url).toBe(
        "https://restcountries.com/v3.1/name/India?fullText=true"
      );
    });

    mockAxios
      .onGet("https://restcountries.com/v3.1/name/India?fullText=true")
      .reply(200, { ok: true });
  });
});
