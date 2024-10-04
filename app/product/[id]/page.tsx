'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDispatch } from '../../../redux/productSlice'
import { FaMinus,FaPlus } from "react-icons/fa6";
import { AppDispatch, RootState } from 'redux/store';
import { Product } from 'types';
import Image from 'next/image';

export default function ProductPage({ params }: {params: {id: string}}) {
  
  const dispatch = useDispatch<AppDispatch>()
  const { product }: { product: Product | null } = useSelector((state:RootState) => state.product)
  const [count,setCount] = useState(1)

  useEffect(()=> {
      dispatch(getProductDispatch(params.id))
  },[dispatch,params.id])  

  if(!product) {
    return <div className='h-screen bg-white text-blue-600'>Loading...</div>
  }

  return (
    <div className='container grid md:grid-cols-3 sm:grid-cols-1 gap-x-6 my-32'>
      {/* PRODUCT IMAGES */}
     <div className='col-span-2'>
     <div className="grid grid-cols-1 gap-4">
        {/* İlk image tam genişlikte */}
        {product?.images?.[0] && (
         <div className="relative h-[600px] w-full overflow-hidden group border flex items-center justify-center">
         <Image
           className="transition-transform hover:cursor-pointer duration-300 group-hover:scale-125"
           src={product?.images[0]?.url.toString()}
           alt="Product Image"
           layout='fill'
           objectFit='contain'
         />
       </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* Diğer image'lar ikişerli olarak */}
        {product?.images?.slice(1, product.images.length).map((item, index) => (
         <div key={index} className="relative overflow-hidden group flex items-center justify-center">
         <Image
           className="object-cover transition-transform hover:cursor-pointer duration-300 group-hover:scale-110"
           src={item.url}
           alt="Product Image"
           layout='responsive'
           objectFit='cover'
           width={300}
           height={300}
         />
       </div>
        ))}
      </div>
     </div>

        {/* PRODUCT CONTENT */}
     <div className='flex flex-col gap-y-6'>
        <h2 className='text-3xl'>{product.name}</h2>
        <span className='flex flex-row gap-x-3 justify-between items-center'>
        <p className='line-through text-xl'>{product.price.toFixed(2)} TL</p>
        <p className='text-xl'>{product.price.toFixed(2)} TL</p>
        <p className='bg-black text-white px-2 py-1 text-sm rounded-full'>İndirim</p>
        </span>
        
        <p className='text-xs text-gray-500'>Vergi dahildir. <span className='underline'>Kargo</span>, ödeme sayfasında hesaplanır.</p>
        <span>Size</span>
        <div className='flex gap-x-4 flex-row'>
          {
            product?.size?.map((item,index)=> (
              <button key={index} className='border rounded-full text-sm px-2.5 py-1'>{item.size}</button>
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
