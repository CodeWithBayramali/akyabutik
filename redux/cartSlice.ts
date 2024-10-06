import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProduct, Product } from "types";
import { RiDeleteBinLine } from "react-icons/ri";


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
        existingProduct.quantity += 1;
        state.total += existingProduct.product.price * action.payload.quantity;
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
        state.total -= existingProduct.product.price;
      }
    },

    removeProduct: (state,action) => {
        const newProducts = state.cartProducts.filter(p=> p.product.id !== action.payload.product.id)
        state.cartProducts = newProducts
        
    },

    reset: (state, action) => {
      state.cartProducts = [];
      state.total = 0;
    },
  },
});

export const { addProduct, reset,removeProduct, discountProduct } = cartSlice.actions;
export default cartSlice.reducer;
