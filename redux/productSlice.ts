import { AnyAction, createSlice, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import data from '../public/data.json'

type AppDispatch = ThunkDispatch<any, any, AnyAction>

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        product: {},
        categoryProducts: [],
    },
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