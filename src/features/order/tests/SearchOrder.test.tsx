import { render, screen } from "../../../test-utils/testing-library-utils";
import SearchOrder from "../SearchOrder";
import { BrowserRouter } from "react-router-dom";

test("Display search form input", () => {
  render(
    <BrowserRouter>
      <SearchOrder />
    </BrowserRouter>
  );

  const searchInput = screen.getByPlaceholderText("Search order #");
  expect(searchInput).toBeInTheDocument();
  expect(searchInput).toHaveValue("");
});
