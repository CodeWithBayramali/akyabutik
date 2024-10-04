import { createSlice, Dispatch } from "@reduxjs/toolkit";
import data from '../public/data.json'
import { Product } from "types";

const initialState :{
    products: Product[],
    product: Product | null,
    categoryProducts: Product[]
} = {
    products: [],
    product: null,
    categoryProducts: []
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getProducts: (state,action) => {
            state.products = action.payload
        },
        getProduct: (state,action) => {
            state.product = action.payload
        }
    }
})

export const getAllProductDispatch = () => async (dispatch: Dispatch) => {
   return dispatch(getProducts(data))
}

export const getProductDispatch = (id: String) => async (dispatch: Dispatch) => {
    const res = data.find(p => p.id === id.toString())
    dispatch(getProduct(res))
}


export const { getProducts, getProduct } = productSlice.actions
export default productSlice.reducer;