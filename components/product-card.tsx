import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Product } from "types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="md:max-w-xs border rounded-lg sm:max-w-full overflow-hidden">
      <div className="relative overflow-hidden group w-full h-80">
        <Link href={`/product/${product?.id}`} >
          <Image
            className="transition-transform hover:cursor-pointer duration-300 group-hover:scale-110"
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${product?.images[0]}`}
            alt="Product Image"
            layout="fill"
            objectFit="cover"
          />
        </Link>
      </div>
      <div className="p-2">
        <Link
          href={`/product/${product.id}`}
          className="text-lg pt-2 font-semibold text-gray-600"
        >
          {product.name}
        </Link>

        <div className="mt-2 flex flex-col justify-between">
        <div className="flex relative flex-row items-center gap-x-4">
        {[...new Set(product.colorSize.map((item) => item.colorName))].map(
            (colorName, index) => {
              // Renk ve Tailwind sınıfı eşleştirmesi
              const colorClassMap = {
                white: "bg-white",
                black: "bg-black",
                red: "bg-red-600",
                blue: "bg-blue-600",
                green: "bg-green-600",
                pink: "bg-pink-600",
                stone: "bg-stone-600",
                yellow: "bg-yellow-600",
                slate: "bg-slate-600"
                // Diğer renkler için gerekli Tailwind sınıflarını ekleyebilirsiniz
              };
        
              return (
                <span
                  key={index}
                  className={`w-5 h-5 border rounded-full ${colorClassMap[colorName as keyof typeof colorClassMap] || "bg-gray-500"}`}
                ></span>
              );
            }
          )}
          </div>
          <div className="flex relative gap-x-2 gap-y-2 mt-4 font-semibold flex-row flex-wrap">
          {[
            ...new Map(
              product?.colorSize?.map((item) => [item.weight, item])
            ).values(),
          ].map((item, index) => (
            <span
              key={index}
              className={`border rounded-full text-xs px-2`}
            >
              {item.weight === 'STD' ? 'Standart': item.weight}
            </span>
          ))}
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
