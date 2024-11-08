'use client'
import ProductCard from "components/product-card";
import Category from "components/product/category";
import React from "react";
import { useSelector } from "react-redux";
import { Product } from "types";
import { RootState } from "redux/store";


export default function Page() {
  const {categoryProducts} = useSelector((state:RootState)=> state.product)

  return (
    <div className="container flex sm:flex-col md:flex-row my-28">
      <div className="md:min-h-screen">
      <Category />
      </div>
      <div className="flex-1">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 flex-nowrap">
          {
              categoryProducts?.map((item:Product,index:number)=> (
                <ProductCard key={parseInt(index.toFixed(2))} product={item} />
              ))
          }
        </div>
      </div>

    </div>
  );
}
