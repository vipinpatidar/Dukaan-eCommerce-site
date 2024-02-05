import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalProducts: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      // state.totalPrice += action.payload.price * action.payload.quantity;
      state.totalProducts = action.payload.totalProds;
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
