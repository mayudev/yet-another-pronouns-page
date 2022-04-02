import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "../../pages/NotFound";

test("renders error message", () => {
  render(<NotFound />, { wrapper: MemoryRouter });
  expect(screen.getByText("Page not found")).toBeInTheDocument();
});
