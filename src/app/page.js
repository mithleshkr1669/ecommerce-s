"use client";

import { useEffect, useState } from "react";
import products from "/public/products.json";
import Product from "../components/Product";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllItem } from "@/lib/features/storedCartItem/AllCartItem";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const [cart, setCart] = useState([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = Cookies.get("authToken");
    console.log("this is token on client side", token);
    if (!token) {
      router.push("/login");
    }
  }, []);

  const allItem = useAppSelector((item) => item.storedCartItem);
  console.log("store item", allItem);

  console.log("cart ", cart);
  useEffect(() => {
    const storedCart = sessionStorage.getItem("cart");
    // console.log("this is storedCart",storedCart)
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart)); // Safely parse the stored cart data

        // console.log("cart get item",cart)
      } catch (error) {
        console.error("Error parsing stored cart data:", error);
        setCart([]);
      }
    }
  }, []);

  // Save cart to sessionStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      sessionStorage.setItem("cart", JSON.stringify(cart));
    } else {
      sessionStorage.removeItem("cart"); // Clean up if cart is empty
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };
  useEffect(() => {
    dispatch(getAllItem(cart));
    console.log("this is cart item", cart);
  }, [cart]);

  return (
    <div className="container mx-auto p-6">
      {/* Header with Cart Icon */}
      <header className="flex justify-between items-center mb-6">
        <h1
          className="text-3xl font-bold "
          style={{ textShadow: "4px 4px 4px rgba(0, 0, 0, 0.5)" }}
        >
          E-Commerce Store
        </h1>
        <div className="relative">
          <Link href="/cartPage">
            <Image
              width={45}
              height={45}
              alt="Your Total Product"
              src="/carticon.png"
            />
          </Link>

          {cart.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {cart.length}
            </span>
          )}
        </div>
      </header>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Product
            key={product.id}
            products={product}
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>
    </div>
  );
}
