import * as yup from 'yup'

export const orderSchema = yup.object().shape({
    nameSurname: yup.string().required(),
    addressDetails: yup.string().required(),
    apartment: yup.string().required(),
    postalCode: yup.string(),
    email: yup.string().required(),
    phoneNumber: yup.string().required(),
})