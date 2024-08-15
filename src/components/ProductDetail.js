"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import QuantitySelector from "./QuantitySelector";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addPrice, subtractPrice } from "@/lib/features/totalPrice/price";

function ProductDetail({ item }) {
  // const items = useAppSelector((item) => item.storedCartItem)
  const [allItem, setAllItem] = useState([]);
  const [price, setPrice] = useState(null);
  // const [totalPrice,setTotalPrice]=useState()
  const priceFromStore = useAppSelector((price) => price.price);
  console.log("priceFromSELECTOR", priceFromStore.totalValue);

  const [totalQuantity, setTotalQuantity] = useState(1);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let cartStored = sessionStorage.getItem("cart");
    // console.log("cartStored",cartStored)
    if (cartStored) {
      let parsedData = JSON.parse(cartStored);
      setAllItem(parsedData);
    }
  }, []);

  const handleIncrease = () => {
    setTotalQuantity((prevTotalQuantity) => {
      const newTotalQuantity = prevTotalQuantity + 1;
      const priceOfProduct = Number((item.price * newTotalQuantity).toFixed(2));
      setPrice(priceOfProduct);
      dispatch(addPrice(priceOfProduct));
      return newTotalQuantity;
    });
  };

  const handleDecrease = () => {
    if (totalQuantity > 1) {
      setTotalQuantity((prevTotalQuantity) => {
        const newTotalQuantity = prevTotalQuantity - 1;
        const priceOfProduct = Number(
          (item.price * newTotalQuantity).toFixed(2)
        );
        setPrice(priceOfProduct);
        dispatch(subtractPrice(priceOfProduct));
        return newTotalQuantity;
      });
    }
  };

  // const handleChange = (e) => {
  //   const value = parseInt(e.target.value);
  //   if (!isNaN(value) && value >= 1) {
  //     setQuantity(value);
  //   }
  // };
  const handleClick = () => {
    let filterData = allItem.filter((items) => items.id !== item.id);

    try {
      sessionStorage.setItem("cart", JSON.stringify(filterData));
    } catch (error) {
      console.log("error in setting data", error);
    }
  };

  return (
    <div className="flex mb-5 p-6">
      <div className="">
        <Image
          src={item.image}
          width={120}
          height={240}
          alt="Sweatshirt"
          className="object-cover"
        />
      </div>
      <div className="ml-6">
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <p className="text-md">₹{price ? price : item.price}</p>

        <div className="flex justify-between  items-center mt-8">
          {/* <div className="text-gray-500">Size: M</div> */}
          <div className="flex gap-4">
            <div className="grid grid-cols-3 gap-2 w-32">
              <button
                onClick={handleDecrease}
                className="bg-gray-200 text-gray-800 px-2 py-1 rounded-l"
              >
                -
              </button>
              <div className="text-center border-gray-300 border px-2 py-1">
                {totalQuantity}
              </div>
              <button
                onClick={handleIncrease}
                className="bg-gray-200 text-gray-800 px-2 py-1 rounded-r"
              >
                +
              </button>
            </div>
            <button onClick={handleClick} className="text-red-500  md:ml-5">
              REMOVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
