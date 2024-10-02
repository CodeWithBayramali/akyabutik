'use client'
import ProductCard from "components/product-card";
import Category from "components/product/category";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductDispatch } from '../../redux/productSlice';
import { Product } from "types";


export default function page() {
  const dispatch = useDispatch()
  const {products} = useSelector((state:any)=> state.product )

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
              products.map((item:any,index:any)=> (
                <ProductCard product={item} />
              ))
          }
        </div>
      </div>

    </div>
  );
}
