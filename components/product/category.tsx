"use client";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import MobileMenuCategory from "./mobile-menu-category";
import { useDispatch } from "react-redux";
import {
  getNewProductsDispatch,
  getProductsByCategoryDispatch,
} from "../../redux/productSlice";
import cat from "../../public/cat.json";
import { FaAngleLeft } from "react-icons/fa";
import { AppDispatch } from "redux/store";

export default function Category() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState("en-yeniler");

  const getProductsByCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  useEffect(() => {
    if (selectedCategory === "en-yeniler") {
      dispatch(getNewProductsDispatch(0, 12));
    } else {
      dispatch(getProductsByCategoryDispatch(selectedCategory));
    }
  }, [dispatch, selectedCategory]);

  return (
    <>
      <MobileMenuCategory />
      <div className="sm:hidden md:sticky top-24 md:flex w-44">
        <ul className="flex md:flex-col sm:flex-row gap-y-2 text-gray-500">
          <li
            onClick={() => getProductsByCategory('en-yeniler')}
            className={`${
              selectedCategory === 'en-yeniler'
                ? "text-blue-600"
                : "hover:text-blue-600 text-gray-600"
            } items-center cursor-pointer flex flex-row justify-between`}
          >
            En Yeniler {selectedCategory === 'en-yeniler' && <FaAngleLeft />}
          </li>
          <li
            onClick={() => getProductsByCategory('elbise')}
            className={`${
              selectedCategory === 'elbise'
                ? "text-blue-600"
                : "hover:text-blue-600 text-gray-600"
            } items-center cursor-pointer flex flex-row justify-between`}
          >
            Elbise {selectedCategory === 'elbise' && <FaAngleLeft />}
          </li>
          <li>
            <button
              className={`text-blue-600 text-sm flex flex-row gap-x-4 items-center justify-between font-semibold`}
            >
              <p>Üst Giyim</p>
              <MdKeyboardArrowDown />
            </button>
            <ul className="flex flex-col text-xs ml-2 gap-y-2 my-2">
              {cat[0]?.subCategories?.map((item, index) => (
                <li
                  key={index}
                  onClick={() => getProductsByCategory(item.tag)}
                  className={`${
                    item.tag === selectedCategory
                      ? "text-blue-600"
                      : "hover:text-blue-600 text-gray-600"
                  } items-center cursor-pointer flex flex-row justify-between`}
                >
                  {item.name} {item.tag === selectedCategory && <FaAngleLeft />}
                </li>
              ))}
            </ul>
          </li>
          <li>
            <button
              className={`text-blue-600 text-sm flex flex-row gap-x-4 items-center justify-between font-semibold`}
            >
              <p>Alt Giyim</p>
              <MdKeyboardArrowDown />
            </button>
            <ul className="flex flex-col text-xs ml-2 gap-y-2 my-2">
              {cat[2]?.subCategories?.map((item, index) => (
                <li
                  key={index}
                  onClick={() => getProductsByCategory(item.tag)}
                  className={`${
                    item.tag === selectedCategory
                      ? "text-blue-600"
                      : "hover:text-blue-600 text-gray-600"
                  } items-center cursor-pointer flex flex-row justify-between`}
                >
                  {item.name} {item.tag === selectedCategory && <FaAngleLeft />}
                </li>
              ))}
            </ul>
          </li>
          <li>
            <button
              className={`text-blue-600 text-sm flex flex-row gap-x-4 items-center justify-between font-semibold`}
            >
              <p>Dış Giyim</p>
              <MdKeyboardArrowDown />
            </button>
            <ul className="flex flex-col text-xs ml-2 gap-y-2 my-2">
              {cat[3]?.subCategories?.map((item, index) => (
                <li
                  key={index}
                  onClick={() => getProductsByCategory(item.tag)}
                  className={`${
                    item.tag === selectedCategory
                      ? "text-blue-600"
                      : "hover:text-blue-600 text-gray-600"
                  } items-center cursor-pointer flex flex-row justify-between`}
                >
                  {item.name} {item.tag === selectedCategory && <FaAngleLeft />}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}
