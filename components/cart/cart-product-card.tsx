'use client'
import React from "react";
import Image from "next/image";
import { CartProduct } from "types";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import { removeProduct } from "../../redux/cartSlice";


export default function CartProductCard({
  cartProduct,
}: {
  cartProduct: CartProduct;
}) {

  const dispatch = useDispatch()

  return (
    <div className="flex flex-row gap-x-4 p-2 border-t">
      <Image
        width={60}
        height={60}
        objectFit="contain"
        src={`${cartProduct.product?.images[0]?.url}`}
        alt="product.jpg"
      />
      <div className="flex w-full flex-col gap-y-2 justify-center">
        <h2 className="">{cartProduct.product?.name}</h2>
        <p className="font-semibold">Fiyat: {cartProduct.product?.price}</p>
        <div className="flex flex-row items-center justify-between">
        <span className="p-2 px-4 flex w-44 gap-x-8 flex-row items-center justify-between border">
          {cartProduct.quantity <= 1 ? (
            <FaMinus />
          ) : (
            <FaMinus className="cursor-pointer" />
          )}
          <p>{cartProduct.quantity}</p>
          <FaPlus className="cursor-pointer" />
        </span>
        <RiDeleteBin5Line onClick={()=> dispatch(removeProduct(cartProduct))} className="text-2xl cursor-pointer text-red-500" />
        </div>
        
      </div>
    </div>
  );
}
