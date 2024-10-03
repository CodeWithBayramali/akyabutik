import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import { thunk } from "redux-thunk";

const store = configureStore({
    reducer: {
        product: productSlice,
        cart: cartSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;