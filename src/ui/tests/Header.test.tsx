import { render, screen } from "../../test-utils/testing-library-utils";
import Header from "../Header";

test("Display the logo image and company name", () => {
  render(<Header />);

  const logoImage = screen.getByRole("img", { name: /the hot slice co./i });
  expect(logoImage).toBeInTheDocument();
  expect(logoImage).toHaveAttribute("src", "/logo.png");
  expect(logoImage).toHaveAttribute("alt", "The Hot Slice Co.");

  const companyName = screen.getByText("The Hot Slice Co.");
  expect(companyName).toBeInTheDocument();
});
