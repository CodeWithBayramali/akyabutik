import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Product } from "types";


export default function ProductCard({product}: {product:Product}) {
  return (
    <div className="md:max-w-xs border p-2 rounded-lg sm:max-w-full overflow-hidden">
      <div className="relative overflow-hidden group">
        <Link href={`/product/${product.id}`}>
        <Image
          className="object-cover transition-transform hover:cursor-pointer duration-300 group-hover:scale-110"
          src={`${product?.images[0]?.url}`}
          alt="Product Image"
          width={600}
          height={600}
          layout="responsive"
        />
        </Link>
      </div>
      <div className="p-1">
        <Link href={`/product/${product.id}`} className="text-md pt-2 font-semibold text-gray-600">
          {product.name}
        </Link>
        <div className="mt-2">
          <div className="flex space-x-2">
            {
              product.size.map((item,index)=> (
                <span key={index} className="px-1.5 py-1 border rounded-full text-xs">{item.size}</span>
              ))
            }
          </div>
          <div className="mt-2 flex space-x-2">
            {
              product.colors.map((item,index)=> (
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
