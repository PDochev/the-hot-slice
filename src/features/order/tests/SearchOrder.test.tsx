import { render, screen } from "../../../test-utils/testing-library-utils";
import SearchOrder from "../SearchOrder";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "../../../App";

test("should display search form input", async () => {
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <SearchOrder />
    </BrowserRouter>
  );

  const searchInput = screen.getByPlaceholderText("Search order #");
  expect(searchInput).toBeInTheDocument();
  expect(searchInput).toHaveValue("");

  await user.clear(searchInput);
  await user.type(searchInput, "123");

  expect(searchInput).toHaveValue("123");
  await user.keyboard("{Enter}");
  expect(searchInput).toHaveValue("");
});

test("should display error message if the user type an invalid order number in the search input", async () => {
  const user = userEvent.setup();
  render(<App />);

  const searchInput = screen.getByPlaceholderText("Search order #");
  expect(searchInput).toBeInTheDocument();
  expect(searchInput).toHaveValue("");

  await user.clear(searchInput);
  await user.type(searchInput, "123");

  expect(searchInput).toHaveValue("123");
  await user.keyboard("{Enter}");
  const errorMessage = await screen.findByText(/something went wrong/i);
  const wrongOrder = screen.queryByText(/couldn't find order #123/i);
  expect(wrongOrder).toBeInTheDocument();
  expect(errorMessage).toBeInTheDocument();
  expect(searchInput).toHaveValue("");
});
