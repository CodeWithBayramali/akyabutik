'use client'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import il from '../public/il.json'
import ilce from '../public/ilce.json'
import { Formik } from "formik";
import { OrderValuesType } from "types";
import { orderSchema } from "util/orderSchema";
import { createOrderDispatch } from "../redux/orderSlice";

export default function PaymentForm() {
  const dispatch = useDispatch<AppDispatch>()
  const {cartProducts,total} = useSelector((state:RootState) => state.cart)
  const [ilceState,setIlceState] = useState<{id:string; il_id:string; name:string}[]>([])
  const [ilIlce,setIlIlce] = useState<{ilName?:string; ilceName?:string}>()

  const handleSelectCity = (value:string) => {
    const [id, name] = value.split(",") as [string,string,string];
    const states = ilce.filter(i => i.il_id === id)
    setIlIlce({...ilIlce,ilName:name})
    setIlceState(states)
  }

  const _handleSubmit = (values:OrderValuesType) => {
    const productList: {
        productId: string,
        productName: string,
        imageUrl: string,
        color: string,
        size: string,
        quantity: number
    }[] = []
    cartProducts.map((item)=> {
      productList.push({
        productId: item.product.id,
        productName: item.product.name,
        imageUrl: item.product.images[0]!,
        color: item.colorTagName,
        size: item.size,
        quantity: item.quantity
      })
    })
    dispatch(createOrderDispatch(
      {
        orderProducts: productList,
        nameSurname: values.nameSurname,
        totalPrice: total,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address: {
          city: ilIlce?.ilName,
          state: ilIlce?.ilceName,
          apartment: values.apartment,
          zipCode: values.postalCode,
          addressDetails: values.addressDetails
        }
      }
    ))
  }

  return (
    <div className="flex flex-col gap-y-6 pr-6 my-6">
      <Formik
        initialValues={{
          nameSurname: '',
          addressDetails: '',
          apartment: '',
          postalCode: '',
          email: '',
          phoneNumber: ''
        }}
        onSubmit={_handleSubmit}
        validationSchema={orderSchema}
      >
        {({values,handleChange,errors,handleSubmit})=> (
          <>
          <div className="flex flex-col gap-y-6 mt-2">
          <h1 className="text-xl font-semibold">İletişim</h1>
          <input
            name="email"
            value={values.email}
            onChange={handleChange('email')}
            className="border border-gray-500 outline-none p-3 rounded-md placeholder:text-sm"
            placeholder="E-posta veya cep telefonu"
          />
        </div>
  
        <div className="flex flex-col gap-y-6 w-full">
          <h1 className="text-xl font-semibold">Teslimat</h1>
          <div className="flex flex-row gap-x-2 w-full">
            <input
              name="nameSurname"
              value={values.nameSurname}
              onChange={handleChange('nameSurname')}
              className="p-3 border border-gray-500 w-full outline-none rounded-md placeholder:text-sm"
              placeholder="Ad Soyad"
            />
          </div>
          <div className="flex flex-col gap-y-6">
            <textarea
              name="addressDetails"
              value={values.addressDetails}
              onChange={handleChange('addressDetails')}
              rows={2}
              className="p-3 border border-gray-500 w-full outline-none rounded-md placeholder:text-sm"
              placeholder="Adres"
            />
            <input
              name="apartment"
              value={values.apartment}
              onChange={handleChange('apartment')}
              className="p-3 border border-gray-500 w-full outline-none rounded-md placeholder:text-sm"
              placeholder="Apartman, daire vb."
            />
          </div>
          <div className="flex flex-row gap-x-2">
            <select
              onChange={(e)=> handleSelectCity(e.currentTarget.value)}
              className="p-3 border border-gray-500 w-full outline-none rounded-md placeholder:text-sm">
              <option>İl Seçiniz</option>
              {
                il.map((item,index)=> (
                  <option key={index} value={`${item.id},${item.name}`}>{item.name}</option>
                ))
              }
            </select>
            <select
            onChange={(e)=> setIlIlce({...ilIlce,ilceName:e.currentTarget.value})}
              className="p-3 border border-gray-500 w-full outline-none rounded-md placeholder:text-sm">
              <option>İlçe Seçiniz</option>
              {
                ilceState.map((item,index)=> (
                  <option>{item.name}</option>
                ))
              }
            </select>
            <input
              name="postalCode"
              value={values.postalCode}
              onChange={handleChange('postalCode')}
              className="p-3 border border-gray-500 w-full outline-none rounded-md placeholder:text-xs"
              placeholder="Posta Kodu (opsiyonel)"
            />
          </div>
          <div>
            <input
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange('phoneNumber')}
              className="p-3 border border-gray-500 w-full outline-none rounded-md placeholder:text-sm"
              placeholder="Telefon"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          <h1 className="text-xl font-semibold">Kargo Yöntemi</h1>
          <div className="bg-blue-100 p-3 flex flex-row justify-between rounded-md">
            <p>Standart</p>
            <p className="font-bold">₺ {process.env.NEXT_PUBLIC_SHIP_PRICE}</p>
          </div>
        </div>
        <div className="flex w-full">
            <button type="submit" onClick={()=> handleSubmit()} className="bg-blue-700 rounded-md text-white w-full p-3 font-semibold">Şimdi Öde</button>
        </div>
        </>
        )}
      </Formik>
      
    </div>
  );
}
