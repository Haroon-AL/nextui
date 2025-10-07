import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider"; // Import the provider

const addMock = vi.fn();
vi.mock("@/store/cartStore", () => ({
  useCartStore: () => ({ add: addMock }),
}));
vi.mock("next/navigation", () => require("next-router-mock"));

import ProductListClient from "../ProductListClient";

const mockProducts = [
  {
    id: 1,
    name: "TS Hoodie",
    price: 45,
    description: "hhod",
    category: "apparel",
    sku: "SKU-00001",
    images: ["https://example.com/1.jpg"],
  },
  {
    id: 2,
    name: "JS Notebook",
    price: 12,
    description: "hhod",
    category: "stationery",
    sku: "SKU-00002",
    images: ["https://example.com/2.jpg"],
  },
  {
    id: 3,
    name: "CSS Print",
    price: 18,
    description: "hhod",
    category: "art",
    sku: "SKU-00003",
    images: ["https://example.com/3.jpg"],
  },
];

describe("ProductListClient (simple)", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ products: mockProducts }),
        })
      )
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders product names and Add to Cart buttons", () => {
    render(
      <MemoryRouterProvider>
        <ProductListClient products={mockProducts} />
      </MemoryRouterProvider>
    );

    for (const p of mockProducts) {
      expect(screen.getByText(p.name)).toBeDefined();
    }

    const addButtons = screen.getAllByText("Add to Cart");
    expect(addButtons.length).toBe(mockProducts.length);
  });

  it("calls cart store add when clicking a product Add to Cart", () => {
    render(
      <MemoryRouterProvider>
        <ProductListClient products={mockProducts} />
      </MemoryRouterProvider>
    );

    const addButtons = screen.getAllByText("Add to Cart");
    fireEvent.click(addButtons[0]);

    expect(addMock).toHaveBeenCalledTimes(1);
    expect(addMock).toHaveBeenCalledWith(
      {
        id: mockProducts[0].id,
        name: mockProducts[0].name,
        price: mockProducts[0].price,
        image: mockProducts[0].images?.[0],
      },
      1
    );
  });
});
