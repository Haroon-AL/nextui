import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

vi.mock("next/navigation", () => require("next-router-mock"));
vi.mock("@/store/cartStore", () => ({
  useCartStore: () => ({ add: vi.fn() }),
}));

import ProductListClient from "../ProductListClient";

const mockProducts = [
  {
    id: 1,
    name: "TS Hoodie",
    price: 45,
    description: "A comfortable hoodie.",
    category: "apparel",
    sku: "SKU-00001",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop&crop=center",
    ],
  },
  {
    id: 2,
    name: "JS Notebook",
    price: 12,
    description: "A great notebook.",
    category: "stationery",
    sku: "SKU-00002",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=500&fit=crop&crop=center",
    ],
  },
];

describe("Products page", () => {
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

  it("renders a list of products (6 mocked entries)", async () => {
    render(
      <MemoryRouterProvider>
        <ProductListClient products={mockProducts} />
      </MemoryRouterProvider>
    );

    for (const p of mockProducts) {
      expect(screen.getByText(p.name)).toBeDefined();
    }

    const addButtons = await screen.findAllByText("Add to Cart");
    expect(addButtons.length).toBe(mockProducts.length);
  });
});
