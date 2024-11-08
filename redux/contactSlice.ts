import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { getGuardParamsRequest, postRequest } from "service/requestService";
import { Contact } from "types";

const initialState :{
    contacts: Contact[],
    contact: Contact | null,
} = {
    contacts: [],
    contact: null
}

const contactSlice = createSlice({
    name:'contact',
    initialState,
    reducers: {
        setContacts: (state,action) => {
            state.contacts = action.payload
        }
    }
})

export const createContactDispatch = (value: object) => async(dispatch: Dispatch) => {
    postRequest({controller:'contact'},value).then(res=> {
        location.reload()
        alert(res.data.message)
    })
}

export const getAllContacts = (page:number,size:number) => async (dispatch:Dispatch) => {
    getGuardParamsRequest({controller:'contact',params:{page,size}}).then(res=> {
        setContacts(res?.data)
    })
}

export const { setContacts } = contactSlice.actions
export default contactSlice.reducer