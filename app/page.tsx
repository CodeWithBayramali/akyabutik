"use client";

import ProductCard from "components/product-card";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "types";
import { AppDispatch, RootState } from "redux/store";
import { getAllProductsDispatch } from "../redux/productSlice";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { products } : {products: Product[]} = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(getAllProductsDispatch(0,12));
  }, [dispatch]);

  const loadProduct = () => {
    dispatch(getAllProductsDispatch(0,products?.length + 4))
  }

  return (
    <>
      <div className="relative w-full sm:h-[450px] md:h-[600px]">
        <Image
          src={'/images/akyacarouselimg.webp'}
          alt="clothes.jpg"
          className="brightness-90 rounded-b-3xl"
          layout="fill" // Kapsayıcıyı doldur
          objectFit="fill" // Doldururken orantıları korur
        />
      </div>
      <div className="container my-12 grid md:grid-cols-4 sm:grid-cols-1 md:gap-6 sm:gap-y-6 flex-wrap">
        {products?.map((item, index) => (
          <ProductCard key={index} product={item} />
        ))}
      </div>
      <div className="my-12 flex items-center justify-center">
        <button onClick={()=> loadProduct()} className="bg-blue-600 text-sm font-semibold p-2 text-white rounded-full px-4">
          Daha Fazla Ürün Yükle
        </button>
      </div>
    </>
  );
}
