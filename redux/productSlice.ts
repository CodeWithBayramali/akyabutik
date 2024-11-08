import { createSlice, Dispatch } from "@reduxjs/toolkit";
import data from '../public/data.json'
import { Product, ProductFormDataType } from "types";
import { deleteGuardRequest, getRequest, postGuardRequest, putGuardRequest } from "service/requestService";
import { AxiosError, AxiosResponse } from "axios";

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
        getCategoryProducts: (state,action) => {
            state.categoryProducts = action.payload
        },
        getProduct: (state,action) => {
            state.product = action.payload
        }
    }
})


export const getProductDispatch = (id:string) => async (dispatch: Dispatch) => {
    getRequest({controller:'product',action:'get-product',id:id}).then(res=> {
        dispatch(getProduct(res?.data))
    })
}

export const createProductDispatch  = (formData: FormData) => async (dispatch: Dispatch) => {
    postGuardRequest({controller:'admin',action:'create-product'},formData)
    .then(res=> {
        location.reload()
        alert(res.data.message)
    }).catch((e:AxiosError) => {
        alert(e.message)
    })
}

export const getAllProductsDispatch = (page:number,size:number) => async (dispatch: Dispatch) => {
    getRequest({controller:'product',params:{page,size}}).then(res=> {
        dispatch(getProducts(res?.data))
    })
} 

export const getProductsByCategoryDispatch = (categoryName:string) => async (dispatch: Dispatch) => {
    getRequest({controller:'product',action:'get-product-category',id:categoryName})
            .then(res=> {
                dispatch(getCategoryProducts(res?.data))
            })
}

export const deleteProductDispatch = (productId: string) => async (dispatch:Dispatch) => {
    deleteGuardRequest({controller:'product',id:productId}).then(res => {
        location.reload()
        alert(res.data.message)
    })
}

export const getNewProductsDispatch = (page:number,size:number) => async(dispatch:Dispatch) => {
    getRequest({controller:'product',action:'get-new-products',params:{page,size}}).then(res=> {
        dispatch(getCategoryProducts(res?.data))
    })
}

export const updateStockDispatch = (newProduct: Product) => async (dispatch:Dispatch) => {
    putGuardRequest({controller:'admin',action:'update-stock'},newProduct).then(res=> {
        location.reload()
        alert(res.data.message)
    })
} 




export const { getProducts, getProduct, getCategoryProducts } = productSlice.actions
export default productSlice.reducer;