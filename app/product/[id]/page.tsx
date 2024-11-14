"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDispatch } from "../../../redux/productSlice";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { AppDispatch, RootState } from "redux/store";
import { Product } from "types";
import Image from "next/image";
import { addProduct } from "../../../redux/cartSlice";

interface StateProductProps {
  count: number;
  size: string;
  colorTagName: string;
  color: string;
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const dispatch = useDispatch<AppDispatch>();
  const { product }: { product: Product | null } = useSelector(
    (state: RootState) => state.product
  );
  const [stateProduct, setStateProduct] = useState<StateProductProps>({
    count: 1,
    size: "",
    color: "",
    colorTagName: "",
  });
  const [errorState, setErrorState] = useState({ color: false, size: false });
  const [isImageTransitioning, setIsImageTransitioning] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>();
  // Seçilen bedene göre renkleri filtreleme
  const filteredColors = product?.colorSize.filter(
    (item) => item.weight === stateProduct.size
  );
  
  const handleSelectColorChangeImage = (color:string) => {
    const foundImage = product?.images.find((imgUrl)=>  imgUrl.split('-').pop()?.split('.').slice(0, -1).join('') === color)
      setSelectedImage(foundImage)
      if (selectedImage) {
        // Efekti başlatmak için kısa bir geçiş ekleyin
        setIsImageTransitioning(true);
        const timer = setTimeout(() => {
          setIsImageTransitioning(false);
        }, 300); // 300ms geçiş süresi, CSS ile aynı olmalı
    
        return () => clearTimeout(timer);
      }
  } 
  
  useEffect(() => {
    setSelectedImage(product?.images[0])
    dispatch(getProductDispatch(params.id));
  }, [dispatch, params.id]);

  const handleSendProductToCart = () => {
    if (!stateProduct.color)
      return setErrorState({ ...errorState, color: !errorState.color });
    if (!stateProduct.size)
      return setErrorState({ ...errorState, size: !errorState.size });
    dispatch(
      addProduct({
        product: product as Product,
        quantity: stateProduct.count,
        size: stateProduct.size,
        color: stateProduct.colorTagName,
        colorTagName: stateProduct.colorTagName
      })
    );
  };

  

  if (!product) {
    return (
      <div className="h-screen bg-white items-center justify-center w-full text-blue-600">
        <p className="text-xl text-blue-600">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="container grid md:grid-cols-3 sm:grid-cols-1 gap-x-6 my-32">
      {/* PRODUCT IMAGES */}
      <div className="col-span-2">
        <div className="grid grid-cols-1 gap-4">
          {/* İlk image tam genişlikte */}
          {product?.images?.[0] && (
           <div
           className={`relative md:h-[800px] sm:h-[500px] w-full overflow-hidden group border flex items-center justify-center 
           transition-opacity duration-300 ${isImageTransitioning ? 'opacity-0' : 'opacity-100'}`}
         >
              <Image
                className="transition-transform hover:cursor-pointer duration-300 group-hover:scale-125"
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${selectedImage ? selectedImage : product.images[0]}`}
                alt="Product Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4 mt-4">
          {/* Diğer image'lar ikişerli olarak */}
          {product?.images
            ?.slice(1, product.images.length)
            .map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden border group h-96 w-full flex items-center justify-center"
              >
                <Image
                  className="object-cover transition-transform hover:cursor-pointer 
                  duration-300 group-hover:scale-110"
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item}`}
                  alt="Product Image"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
        </div>
      </div>

      {/* PRODUCT CONTENT */}
      <div className="flex flex-col gap-y-6">
        <h2 className="text-3xl sm:mt-4 md:mt-0">{product.name}</h2>
        <span className="flex flex-row gap-x-3 justify-between items-center">
          <p className="text-xl font-semibold">{product.price.toFixed(2)} TL</p>
        </span>

        <p className="text-xs text-gray-500">
          Vergi dahildir. <span className="underline">Kargo</span>, ödeme
          sayfasında hesaplanır.
        </p>
        <span>Beden</span>
        <div className="flex relative gap-x-4 flex-row">
          {[
            ...new Map(
              product?.colorSize?.map((item) => [item.weight, item])
            ).values(),
          ].map((item, index) => (
            <button
              onClick={() => {
                setStateProduct({ ...stateProduct, size: item.weight });
                setErrorState({ ...errorState, size: false });
              }}
              key={index}
              className={`${
                stateProduct.size === item.weight
                  ? "border rounded-full bg-black text-white text-sm px-2.5 py-1"
                  : "border rounded-full text-sm px-2.5 py-1"
              }`}
            >
              {item.weight === 'STD' ? 'Standart': item.weight}
            </button>
          ))}
          {errorState.size && (
            <span className="text-xs absolute -bottom-6 text-red-600">
              Lütfen beden seçiniz!
            </span>
          )}
        </div>
        <p>Renk</p>
        <div className="flex relative flex-row items-center gap-x-4">
          {/* Beden seçildiğinde, sadece o bedene ait renkleri göster */}
          {filteredColors?.map((item, index) => {
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
            };

            return (
              <button
                key={index}
                disabled={item.count <= 0}
                onClick={() => {
                  if (item.count > 0) {
                    setStateProduct({
                      ...stateProduct,
                      color: item.colorName,
                      colorTagName: item.colorTagName,
                    });
                    handleSelectColorChangeImage(item.colorName)
                    setErrorState({ ...errorState, color: false });
                  }
                }}
                className={`${
                  stateProduct.color === item.colorName &&
                  "border-4 border-gray-500"
                } w-6 h-6 border rounded-full ${
                  colorClassMap[item.colorName as keyof typeof colorClassMap] ||
                  "bg-gray-500"
                }`}
              ></button>
            );
          })}
          {errorState.color && (
            <span className="text-xs absolute -bottom-6 text-red-600">
              Lütfen renk seçiniz!
            </span>
          )}
        </div>
        <p className="mt-2">Adet</p>
        <span className="py-3 px-4 flex w-40 gap-x-8 flex-row items-center justify-between border">
          {stateProduct.count <= 1 ? (
            <FaMinus
              className={`${
                stateProduct.count <= 1 && "text-gray-300 cursor-not-allowed"
              }`}
            />
          ) : (
            <FaMinus
              className="cursor-pointer"
              onClick={() =>
                setStateProduct({
                  ...stateProduct,
                  count: stateProduct.count - 1,
                })
              }
            />
          )}
          <p>{stateProduct.count}</p>
          <FaPlus
            className={`${
              stateProduct.count >=
              (product.colorSize.find(
                (item) => item.colorName === stateProduct.color
              )?.count || 0)
                ? "text-gray-300 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => {
              const stockLimit =
                product.colorSize.find(
                  (item) => item.colorName === stateProduct.color
                )?.count || 0;

              if (stateProduct.count < stockLimit) {
                setStateProduct({
                  ...stateProduct,
                  count: stateProduct.count + 1,
                });
              }
            }}
          />
        </span>

        <button
          onClick={handleSendProductToCart}
          className="border py-2 hover:bg-black hover:text-white transition-all"
        >
          Sepete Ekle
        </button>
        <p className="text-gray-500 text-sm">{product.description}</p>
      </div>
    </div>
  );
}
