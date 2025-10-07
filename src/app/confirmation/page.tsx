"use client";

import { useRouter } from "next/navigation";
import Button from "../products/Button";

export default function Confirmation() {
  const router = useRouter();

  function continueShopping() {
    router.push("/products");
  }

  return (
    <div className="flex flex-col items-center justify-center border-r-8 gap-8">
      <div className="bg-emerald-200 p-8 text-white border-r-4 w-full max-w-3xl flex flex-col items-center">
        <h1 className="text-2xl font-bold">THANK YOU FOR PURCHASE</h1>
        <p>An email has been sent to your mail</p>
      </div>

      <div className="w-100 content-center">
        <Button onClick={continueShopping}>Continue Shopping</Button>
      </div>
    </div>
  );
}
