'use client'
import ProductCard from "components/product-card";
import Category from "components/product/category";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductDispatch } from '../../redux/productSlice';
import { Product } from "types";
import { AppDispatch, RootState } from "redux/store";


export default function page() {
  const dispatch = useDispatch<AppDispatch>()
  const {products} : {products: Product[]} = useSelector((state:RootState)=> state.product )

  useEffect(()=> {
    dispatch(getAllProductDispatch())
  },[dispatch])

  return (
    <div className="container flex my-28">
     <div className="sticky top-64">
     <Category />
     </div>
      <div className="flex-1">
        <div className="grid grid-cols-3 gap-4 flex-nowrap">
          {
              products.map((item:Product,index:Number)=> (
                <ProductCard key={parseInt(index.toFixed(2))} product={item} />
              ))
          }
        </div>
      </div>

    </div>
  );
}
