import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Form from "../components/Form";
import { act, fireEvent, render } from "@testing-library/react";

fetchMock.enableMocks();

test("API", async () => {
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
