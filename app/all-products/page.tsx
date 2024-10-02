'use client'
import ProductCard from "components/product-card";
import Category from "components/product/category";
import React from "react";


export default function page() {
  return (
    <div className="container flex my-28">
     <div className="sticky top-64">
     <Category />
     </div>
      <div className="flex-1">
        <div className="grid grid-cols-3 gap-4 flex-nowrap">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
      </div>

    </div>
  );
}
