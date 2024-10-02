import { createSlice, Dispatch } from "@reduxjs/toolkit";
import data from '../public/data.json'

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        categoryProducts: [],
        cart: []
    },
    reducers: {
        getProducts: (state,action) => {
            state.products = action.payload
        },
        addCart: (state,action) => {
            state.cart = action.payload
        },
        deleteProductFromCart: (state, action) => {
            
        }
    }
})

export const getAllProductDispatch = () => async (dispatch: Dispatch) => {
   return dispatch(getProducts(data))
}


export const { getProducts, addCart, deleteProductFromCart } = productSlice.actions
export default productSlice.reducer;