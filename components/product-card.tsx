import React from "react";
import { Product } from "types";

export default function ProductCard({product}: {product:Product}) {
  return (
    <div className="md:max-w-xs border p-2 rounded-lg sm:max-w-max overflow-hidden">
      <div className="relative overflow-hidden group">
        <img
          className="w-96 h-96 object-cover transition-transform hover:cursor-pointer duration-300 group-hover:scale-110"
          src={product?.images[0]?.url}
          alt="Product Image"
        />
      </div>
      <div className="p-1">
        <h2 className="text-md pt-2 font-semibold text-gray-600">
          {product.name}
        </h2>
        <div className="mt-2">
          <div className="flex space-x-2">
            {
              product.size.map((item:any,index:any)=> (
                <span className="px-2 py-1 border rounded-full text-sm">{item.size}</span>
              ))
            }
          </div>
          <div className="mt-2 flex space-x-2">
            {
              product.colors.map((item:any,index:any)=> (
                item.color === 'white' ? (
                  <span key={index} className={`w-4 h-4 text-xs rounded-full bg-white border`}></span>
                ) :
                  <span key={index} className={`w-4 h-4 text-xs rounded-full bg-${item.color}-600 border`}></span>
              ))
            }
          </div>
        </div>
        <div className="flex justify-start items-center mt-4">
          <span className="text-md text-gray-900">
            ₺ {product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
