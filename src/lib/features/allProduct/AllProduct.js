import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

const allProduct = createSlice({
  name: "allProduct",
  initialState,
  reducers: {
    getAllProduct: (state, action) => {
      console.log("all product", action.payload);
      return action.payload;
    },
  },
});

export const { getAllProduct } = allProduct.actions;
export default allProduct.reducer;
