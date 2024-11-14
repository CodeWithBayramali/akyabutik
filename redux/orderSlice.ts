import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { getGuardParamsRequest, postRequest } from "service/requestService";
import { OrderProduct } from "types";

const initialState : {
    order: OrderProduct | null,
    orders: OrderProduct[]
} = {
    order: null,
    orders: []
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
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

export const getOrdersDispatch = (page:number,size:number) => async (dispatch:Dispatch) => {
    getGuardParamsRequest({controller:'admin',action:'get-all-orders',params:{page,size}}).then(res=> {
        dispatch(getOrders(res?.data))
    })
} 


export const {getOrder, getOrders} = orderSlice.actions

export default orderSlice.reducer;