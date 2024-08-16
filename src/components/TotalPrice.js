"use client";
import { useAppSelector } from "@/lib/hooks";
import React, { useState } from "react";
import DiscountCalculator from "./DiscountCalculator";

function TotalPrice() {
  const [isDisplay, setIsDisplay] = useState(true);
  const [discountedPrice, setDiscountedPrice] = useState();

  function handleClick() {
    setIsDisplay(false);
  }

  function handleDiscount(discountedPrice) {
    setDiscountedPrice(discountedPrice);
  }

  let totalPrice = useAppSelector((item) => item.price.totalValue);
  let finalTotalPrice = totalPrice - discountedPrice;
  let fixedDecimalPrice=finalTotalPrice.toFixed(2)
  return (
    <div className="bg-gray-100 p-6 md:rounded-lg shadow-lg self-start">
      <h2 className="text-xl font-semibold mb-4">Price Details</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Price (1 item)</span>
          <span>₹{discountedPrice ? finalTotalPrice : totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span className="text-green-500">
            {discountedPrice ? discountedPrice : "-₹0"}
          </span>
        </div>
        {/* <div className="flex justify-between">
            <span>Delivery Charges</span>
            <span className="text-green-500">₹40 Free</span>
        </div> */}
        {isDisplay ? (
          <span
            className="text-pink-700 mt-5 hover:cursor-pointer hover:text-pink-500"
            onClick={handleClick}
          >
            Check Coupon Or Discount
          </span>
        ) : (
          <DiscountCalculator handleDiscount={handleDiscount} />
        )}
      </div>
      <hr className="my-4" />
      <div className="flex justify-between font-semibold">
        <span>Total Amount</span>
        <span>₹{discountedPrice ? finalTotalPrice : totalPrice}</span>
      </div>
      <p className="text-green-500 mt-2">
        You will save ₹{discountedPrice} on this order
      </p>
      <button className="bg-orange-500 text-white w-full mt-4 py-2 rounded-lg">
        PLACE ORDER
      </button>
    </div>
  );
}

export default TotalPrice;
