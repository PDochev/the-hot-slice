import { render, screen } from "../../../test-utils/testing-library-utils";
import SearchOrder from "../SearchOrder";

test("Display search form input", () => {
  render(<SearchOrder />);

  const searchInput = screen.getByPlaceholderText("Search order #");
  expect(searchInput).toBeInTheDocument();
  expect(searchInput).toHaveValue("");
});
