'use client'
import ProductCard from "components/product-card";
import Category from "components/product/category";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductDispatch } from '../../redux/productSlice';
import { Product } from "types";
import { AppDispatch, RootState } from "redux/store";


export default function Page() {
  const dispatch = useDispatch<AppDispatch>()
  const {products} : {products: Product[]} = useSelector((state:RootState)=> state.product )

  useEffect(()=> {
    dispatch(getAllProductDispatch())
  },[dispatch])

  return (
    <div className="container flex sm:flex-col md:flex-row my-28">
     <div className="sticky md:top-64 sm:top-0">
     <Category />
     </div>
      <div className="flex-1">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 flex-nowrap">
          {
              products.map((item:Product,index:number)=> (
                <ProductCard key={parseInt(index.toFixed(2))} product={item} />
              ))
          }
        </div>
      </div>

    </div>
  );
}
