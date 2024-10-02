import React from "react";
import { Product } from "types";

export default function ProductCard() {
  return (
    <div className="md:max-w-xs sm:max-w-max overflow-hidden">
      <div className="relative overflow-hidden group">
        <img
          className="w-96 h-96 object-cover transition-transform hover:cursor-pointer duration-300 group-hover:scale-110"
          src="https://monannee.co/cdn/shop/files/MONANNEE11468.jpg?v=1724789688"
          alt="Product Image"
        />
      </div>
      <div className="p-1">
        <h2 className="text-md pt-2 text-gray-600">
          Yeni Sezon T-Shirt
        </h2>
        <div className="mt-2">
          <div className="flex space-x-2">
            <span className="px-2 py-1 border rounded-full text-sm">S</span>
            <span className="px-2 py-1 border rounded-full text-sm">M</span>
            <span className="px-2 py-1 border rounded-full text-sm">L</span>
            <span className="px-2 py-1 border rounded-full text-sm">XL</span>
            <span className="px-2 py-1 border rounded-full text-sm">2XL</span>
          </div>
          <div className="mt-2 flex space-x-2">
            <span className="w-6 h-6 rounded-full bg-white-500 border"></span>
            <span className="w-6 h-6 rounded-full bg-black border"></span>
            <span className="w-6 h-6 rounded-full bg-blue-500 border"></span>
          </div>
        </div>
        <div className="flex justify-start items-center mt-4">
          <span className="text-md text-gray-900">
            ₺ 1.299,00
          </span>
        </div>
      </div>
    </div>
  );
}
