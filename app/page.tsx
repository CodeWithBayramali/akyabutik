'use client'
import MainCarousel from "components/common/main-carousel";
import ProductCard from "components/product-card";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductDispatch } from "../redux/productSlice";
import { Product } from "types";
import { AppDispatch } from "redux/store";

export default function Home() {

  const dispatch = useDispatch<AppDispatch>()
  const {products} = useSelector((state:any)=> state.product)

  useEffect(()=> {
    dispatch(getAllProductDispatch())
  },[dispatch])

  return (
    <>
      <img
        src="https://frenchquartermag.com/wp-content/uploads/2024/03/new-clothes-clothing-rack-getty-0222-2000-5150e393b7354f5fbb7bc7651cb89f90.jpg"
        alt="clothes.jpg"
        className="w-full md:h-[600px] brightness-90 sm:h-[500px] object-fill rounded-b-3xl"
      />
      <div className="container my-12 grid md:grid-cols-4 sm:grid-cols-1 md:gap-6 sm:gap-y-6 flex-wrap">
        {
          products.map((item:Product,index:Number)=> (
            <ProductCard product={item} />
          ))
        }
      </div>
      <div className="my-12 flex items-center justify-center">
        <button className="bg-blue-600 text-sm font-semibold p-2 text-white rounded-full px-4">
          Daha Fazla Ürün Yükle
        </button>
      </div>
    </>
  );
}
