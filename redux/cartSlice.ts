import { createSlice } from "@reduxjs/toolkit";
import { CartProduct, ColorSizeType, Product } from "types";

const getInitialState = (): CartState => {
  if (typeof window === "undefined") {
    // Eğer sunucu tarafında çalışıyorsa, sadece varsayılan initial state dönüyoruz
    return {
      cartProducts: [],
      total: 0,
    };
  }

  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    const parsedCart = JSON.parse(savedCart);
    return {
      cartProducts: parsedCart.cartProducts || [],
      total: parsedCart.total || 0,
    };
  }
  return {
    cartProducts: [],
    total: 0,
  };
};

interface CartState {
  cartProducts: CartProduct[];
  total: number;
}
const initialState = getInitialState()



const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const {product,quantity, colorTagName,size} = action.payload
      const existingProduct = state.cartProducts.find(
        (p) => p.product.id === action.payload.product.id
      );
      console.log(action.payload)
        const stock = product.colorSize.find(
          (item:ColorSizeType)=> item.colorTagName === colorTagName && item.weight === size)?.count
      if (existingProduct) {
        console.log(existingProduct.quantity,stock)
        if(existingProduct.quantity >= stock) {
          alert('Stok Adetini Aştınız !')
          return;
        }else {
          state.total += existingProduct.product.price;
        existingProduct.quantity += 1;
        }
      } else {
        state.cartProducts.push(action.payload);
        state.total += action.payload.product.price * action.payload.quantity;
      }
      localStorage.setItem('cart',JSON.stringify({cartProducts:state.cartProducts,total:state.total}))
    },

    discountProduct: (state, action) => {
      const existingProduct = state.cartProducts.find(
        (p) => p.product.id === action.payload.product.id
      );
      if (existingProduct && existingProduct.quantity !== undefined) {
        existingProduct.quantity -= 1;
        state.total -= action.payload.product.price;
      }
      localStorage.setItem('cart',JSON.stringify({cartProducts:state.cartProducts,total:state.total}))
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
      localStorage.setItem('cart',JSON.stringify({cartProducts:state.cartProducts,total:state.total}))
    },

    reset: (state, action) => {
      state.cartProducts = [];
      state.total = 0;
      localStorage.removeItem('cart')
    },
  },
});

export const { addProduct, reset, removeProduct, discountProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
