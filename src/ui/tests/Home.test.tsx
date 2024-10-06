import { render, screen } from "../../test-utils/testing-library-utils";
import Home from "../Home";
import { expect } from "vitest";

test("Display the Home page heading and subheading", () => {
  render(<Home />);

  const pizzaHeading = screen.getByRole("heading", {
    name: /the best pizza./i,
  });
  expect(pizzaHeading).toBeInTheDocument();

  const pizzaSubHeading = screen.getByRole("heading", {
    name: / Straight out of the oven, straight to you./i,
  });
  expect(pizzaSubHeading).toBeInTheDocument();
});
