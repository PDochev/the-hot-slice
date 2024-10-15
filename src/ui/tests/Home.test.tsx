import { render, screen } from "../../test-utils/testing-library-utils";
import Home from "../Home";
import { BrowserRouter } from "react-router-dom";

test("should display the Home page heading and subheading", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  const pizzaHeading = screen.getByRole("heading", {
    name: /the best pizza./i,
  });
  expect(pizzaHeading).toBeInTheDocument();

  const pizzaSubHeading = screen.getByRole("heading", {
    name: / Straight out of the oven, straight to you./i,
  });
  expect(pizzaSubHeading).toBeInTheDocument();
});
