import { configureStore } from "@reduxjs/toolkit";
import allItemReducer from "../lib/features/storedCartItem/AllCartItem";
import priceReducer from "../lib/features/totalPrice/price";
import allProductReducer from "../lib/features/allProduct/AllProduct";

export const makeStore = () => {
  return configureStore({
    reducer: {
      storedCartItem: allItemReducer,
      price: priceReducer,
      allProduct: allProductReducer,
    },
  });
};
