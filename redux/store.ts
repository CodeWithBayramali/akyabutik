import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
    reducer: {
        product: productSlice,
        cart: cartSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch

export default store;