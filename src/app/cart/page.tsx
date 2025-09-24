"use client";

import { useCartStore, CartItem } from "@/store/cartStore";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { listCart, del, clear } = useCartStore();
  const cartItems = listCart();

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
          <button
            onClick={() => {}}
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded font-medium px-2"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

function CartItemRow({
  item,
  onRemove,
}: {
  item: CartItem;
  onRemove: (id: number) => void;
}) {
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

      <div className="text-gray-600 px-4">Qty: {item.quantity}</div>

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
