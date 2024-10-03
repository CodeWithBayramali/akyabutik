'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDispatch } from '../../../redux/productSlice'
import { FaMinus,FaPlus } from "react-icons/fa6";


export default function page({ params }: {params: {id: string}}) {
  
  const dispatch = useDispatch()
  const {product} = useSelector((state:any) => state.product)
  const [count,setCount] = useState(1)
  useEffect(()=> {
      dispatch(getProductDispatch(params.id))
  },[dispatch])  

  const handleAddCart = () => {
    
  }

  return (
    <div className='container grid md:grid-cols-3 sm:grid-cols-1 gap-x-6 my-32'>
      {/* PRODUCT IMAGES */}
     <div className='col-span-2'>
     <div className="grid grid-cols-1 gap-4">
        {/* İlk image tam genişlikte */}
        {product?.images?.[0] && (
         <div className="relative overflow-hidden group border flex items-center justify-center">
         <img
           className="w-96 h-full object-cover transition-transform hover:cursor-pointer duration-300 group-hover:scale-110"
           src={product?.images[0]?.url}
           alt="Product Image"
         />
       </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* Diğer image'lar ikişerli olarak */}
        {product?.images?.slice(1, product.images.length).map((item: any, index: any) => (
         <div className="relative overflow-hidden group flex items-center justify-center">
         <img
           className="w-96 h-full object-cover transition-transform hover:cursor-pointer duration-300 group-hover:scale-110"
           src={item.url}
           alt="Product Image"
         />
       </div>
        ))}
      </div>
     </div>

        {/* PRODUCT CONTENT */}
     <div className='flex flex-col gap-y-6'>
        <h2 className='text-3xl'>{product.name}</h2>
        <span className='flex flex-row justify-around'>
        <p>{parseFloat(product.price).toFixed(2)}</p>
        <p className='text-xl'>{parseFloat(product.price).toFixed(2)} TL</p>
        </span>
        
        <p className='text-xs text-gray-500'>Vergi dahildir. <span className='underline'>Kargo</span>, ödeme sayfasında hesaplanır.</p>
        <span>Size</span>
        <div className='flex gap-x-4 flex-row'>
          {
            product?.size?.map((item:any,index:any)=> (
              <button className='border rounded-full text-sm px-2.5 py-1'>{item.size}</button>
            ))
          }
        </div>
        <p>Adet</p>
        <span className='p-2 px-4 flex w-fit gap-x-8 flex-row items-center justify-between border'>
          <FaMinus onClick={()=> setCount(count-1)} />
          <p>{count}</p>
          <FaPlus onClick={()=> setCount(count+1)} />
        </span>
        <button className='border py-2'>Sepete Ekle</button>
        <button className='bg-black text-white py-2'>Hemen satın alın</button>
        <p className='text-gray-500 text-sm'>
          {product.description}
        </p>
     </div>
    </div>
  )
}
