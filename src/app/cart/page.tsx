"use client";

import { useState } from "react";
import { useCartStore, CartItem } from "@/store/cartStore";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import Button from "../products/Button";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { listCart, del, clear } = useCartStore();
  const cartItems = listCart();
  const [showPopup, setShowPopup] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
          <Link
            href="/products"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const router = useRouter();

  function submitOrder(cartProducts: CartItem[], e: React.FormEvent) {
    e.preventDefault(); // stop form submission
    localStorage.setItem("cartItems", JSON.stringify(cartProducts));
    router.push("/confirmation"); // client-side redirect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
        <button
          onClick={clear}
          className="text-black hover:text-red-800 text-sm border-1 border-black rounded-2xl px-2 bg-amber-700"
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-4 mb-8">
        {cartItems.map((item) => (
          <CartItemRow key={item.id} item={item} onRemove={del} />
        ))}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex justify-between items-center text-md">
          <span>Total: ${totalPrice.toFixed(2)}</span>
          <Button onClick={() => setShowPopup(true)}>Checkout</Button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Enter Shipping Details</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 p-2 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                placeholder="phone"
                className="w-full border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full border border-gray-300 p-2 rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => submitOrder(cartItems, e)}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function CartItemRow({
  item,
  onRemove,
}: Readonly<{
  item: CartItem;
  onRemove: (id: number) => void;
}>) {
  const { updateQuantity } = useCartStore();

  const increment = () => updateQuantity(item.id, item.quantity + 1);
  const decrement = () => {
    if (item.quantity > 1) updateQuantity(item.id, item.quantity - 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center gap-4">
      <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-xs">
            No Image
          </div>
        )}
      </div>

      <div className="flex-grow">
        <h3 className="font-medium text-gray-800">{item.name}</h3>
      </div>

      <div className="flex items-center gap-2 px-4">
        <button
          onClick={decrement}
          className="px-2 py-1 border rounded text-gray-700"
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={increment}
          className="px-2 py-1 border rounded text-gray-700"
        >
          +
        </button>
      </div>

      <div className="text-lg font-semibold text-gray-800 px-4">
        ${(item.price * item.quantity).toFixed(2)}
      </div>

      <button
        onClick={() => onRemove(item.id)}
        className="text-gray-400 hover:text-red-500 transition-colors p-2"
        title="Remove item"
      >
        <Trash2 className="w-5 h-5 " />
      </button>
    </div>
  );
}
