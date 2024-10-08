import { createSlice } from "@reduxjs/toolkit";
import { CartProduct } from "types";

interface CartState {
  cartProducts: CartProduct[];
  total: number;
}
const initialState: CartState = {
  cartProducts: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.cartProducts.find(
        (p) => p.product.id === action.payload.product.id
      );
      if (existingProduct) {
        state.total += existingProduct.product.price;
        existingProduct.quantity += 1;
      } else {
        state.cartProducts.push(action.payload);
        state.total += action.payload.product.price * action.payload.quantity;
      }
    },

    discountProduct: (state, action) => {
      const existingProduct = state.cartProducts.find(
        (p) => p.product.id === action.payload.product.id
      );
      if (existingProduct && existingProduct.quantity !== undefined) {
        existingProduct.quantity -= 1;
        state.total -= action.payload.product.price;
      }
    },

    removeProduct: (state, action) => {
      const productToRemove = state.cartProducts.find(
        (p) => p.product.id === action.payload.product.id
      )
      if(productToRemove)
        state.total -= productToRemove.product.price * productToRemove.quantity
      state.cartProducts = state.cartProducts.filter(
        (p) => p.product.id !== action.payload.product.id
      )
    },

    reset: (state, action) => {
      state.cartProducts = [];
      state.total = 0;
    },
  },
});

export const { addProduct, reset, removeProduct, discountProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
