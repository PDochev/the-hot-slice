import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import CreateUser from "../CreateUser";

test("renders the create user form", async () => {
  const user = userEvent.setup();
  render(<CreateUser />);

  const welcomeMessage = screen.getByText(
    /welcome! please start by telling us your name:/i
  );
  expect(welcomeMessage).toBeInTheDocument();

  const input = screen.getByPlaceholderText("Your full name");
  expect(input).toBeInTheDocument();

  await user.clear(input);
  await user.type(input, "John Doe");
  expect(input).toHaveValue("John Doe");

  const startOrderingButton = screen.getByRole("button", {
    name: /start ordering/i,
  });
  expect(startOrderingButton).toBeInTheDocument();
});
