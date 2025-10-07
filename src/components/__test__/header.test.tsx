import Header from "../header";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("Header", () => {
  it("renders the header component", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeDefined();
  });
});
