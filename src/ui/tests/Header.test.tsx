import { render, screen } from "../../test-utils/testing-library-utils";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";
test("should display the logo image , company name and search order", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  const logoImage = screen.getByRole("img", { name: /the hot slice co./i });
  expect(logoImage).toBeInTheDocument();
  expect(logoImage).toHaveAttribute("src", "/logo.png");
  expect(logoImage).toHaveAttribute("alt", "The Hot Slice Co.");

  const companyName = screen.getByText("The Hot Slice Co.");
  expect(companyName).toBeInTheDocument();

  const searchInput = screen.getByPlaceholderText("Search order #");
  expect(searchInput).toBeInTheDocument();
  expect(searchInput).toHaveValue("");
});
