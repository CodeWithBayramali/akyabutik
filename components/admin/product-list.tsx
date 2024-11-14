"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductDispatch,
  getAllProductsDispatch,
} from "../../redux/productSlice";
import { AppDispatch, RootState } from "redux/store";
import { Product } from "types";
import Image from "next/image";
import OpenStockModal from "./open-stock-modal";

export default function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const [stock, setStock] = useState<Product>();
  const { products }: { products: Product[] } = useSelector(
    (state: RootState) => state.product
  );
  const toggleModal = (
    pS: Product
  ) => {
    setStock(pS);
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(getAllProductsDispatch(0, 12));
  }, [dispatch]);

  const loadProduct = () => {
    dispatch(getAllProductsDispatch(0, products?.length + 10));
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center">
        <button className="border-r text-sm p-2 hover:bg-black hover:text-white transition-all">
          En Yeniler
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="border rounded-lg overflow-hidden dark:border-neutral-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Stock
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {products?.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.images[0]}`}
                        width={30}
                        height={40}
                        alt={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.images[0]}`}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                      {item.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-xs font-medium">
                      <button
                        onClick={() => toggleModal(item)}
                        className="text-xs mr-3 text-white p-1 rounded-lg bg-blue-600"
                      >
                        Stok
                      </button>
                      <button
                        onClick={() => dispatch(deleteProductDispatch(item.id))}
                        type="button"
                        className="inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-transparent text-white focus:outline-none bg-red-600 p-1"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-row items-center justify-center">
            <button
              onClick={loadProduct}
              className="bg-blue-500 p-2 text-white text-xs rounded-lg mt-8"
            >
              Daha Fazla Ürün Yükle
            </button>
          </div>
        </div>
      </div>
      <OpenStockModal
        isOpen={isOpen}
        closeModal={closeModal}
        colorSize={stock}
      />
    </div>
  );
}
