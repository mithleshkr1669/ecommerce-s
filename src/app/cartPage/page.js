"use client";
import ProductDetail from "@/components/ProductDetail";
import TotalPrice from "@/components/TotalPrice";
import { getAllItem } from "@/lib/features/storedCartItem/AllCartItem";
import { addPrice } from "@/lib/features/totalPrice/price";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ResponsiveLayout() {
  const [cartItem, setCartItem] = useState([]);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    let cartStored = sessionStorage.getItem("cart");
    if (cartStored) {
      setCartItem(JSON.parse(cartStored));
    }
  }, []);
  
  useEffect(() => {
    dispatch(getAllItem(cartItem));
  }, [cartItem]);

 

  return (
    <div className="md:p-6">
      <header className="sm:flex sm:flex-wrap md:flex justify-between items-center mb-10 mt-4 smallMobile">
        <h1
          className=" mb-4 text-3xl font-bold"
          style={{ textShadow: "4px 4px 4px rgba(0, 0, 0, 0.5)" }}
        >
          E-Commerce Store
        </h1>
        <div className="smallMobile animate-bounce hover:animate-none">
          <Link
            className="md:px-4 py-2 px-2  sm:text-sm text-white bg-orange-600 rounded-md shadow-lg"
            href="/"
          >
            SHOP MORE...
          </Link>
        </div>
      </header>
      <div className=" grid grid-cols-1 lg:grid-cols-4 gap-10 mt-10 sm:w-full">
        <div className="lg:col-span-3 h-fit shadow-lg md:rounded-lg bg-white">
          {cartItem.map((item, index) => (
            <div key={index}>
              <ProductDetail cartItem={cartItem} item={item} />

              <hr />
            </div>
          ))}
        </div>

        <div className="lg:col-span-1 pb-5  h-fit">
          <TotalPrice />
        </div>
      </div>
    </div>
  );
}
