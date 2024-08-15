import { createSlice } from "@reduxjs/toolkit";
import getSessionData from "@/lib/getSessionData";

let initialState = {
  totalValue: 0,
};

const price = createSlice({
  name: "price",
  initialState,
  reducers: {
    addPrice: (state, action) => {
      console.log("initial price from store", action.payload);
      state.totalValue += action.payload;
    },
    subtractPrice: (state, action) => {
      console.log("total price from store", action.payload);
      state.totalValue -= action.payload;
    },
  },
});

export const { addPrice, subtractPrice } = price.actions;
export default price.reducer;
