import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { postRequest } from "service/requestService";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: {},
        orders: []
    },
    reducers: {
        getOrders: (state,action) => {
            state.orders = action.payload
        },
        getOrder: (state,action) => {
            state.order = action.payload
        }
    }
})


export const createOrderDispatch = (value:object) => async (dispatch: Dispatch) => {
    postRequest({controller:'order'},value).then(res=> {
        alert(res.data.message)
    })
} 


export const {getOrder, getOrders} = orderSlice.actions

export default orderSlice.reducer;