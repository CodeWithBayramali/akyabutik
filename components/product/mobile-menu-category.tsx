"use client";
import React, { useEffect, useState } from "react";
import categories from "../../public/category.json";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import cat from "../../public/cat.json";
import { getNewProductsDispatch } from "../../redux/productSlice";
import { getProductsByCategoryDispatch } from "../../redux/productSlice";

export default function MobileMenuCategory() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState("en-yeniler");
  const [subCategories,setSubCategories] = useState<{id:string; name:string; tag:string}[] | undefined>([])

  const getProductsByCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const changeSubCategory = (value:string) => {
    const sub = cat.find(p => p.tag === value)
    if (sub && sub.subCategories) {
      setSubCategories(sub.subCategories)
    }else {
      setSubCategories([])
    }
  }

  useEffect(() => {
    if (selectedCategory === "en-yeniler") {
      dispatch(getNewProductsDispatch(0, 12));
    } else {
      dispatch(getProductsByCategoryDispatch(selectedCategory));
    }
  }, [dispatch, selectedCategory]);

  return (
      <div className="container mb-4 md:hidden">
        <ul className="flex flex-row gap-y-4 text-center justify-between text-[11px] flex-wrap">
        <li
              onClick={() => getProductsByCategory('en-yeniler')}
              className={`hover:bg-black hover:text-white border p-1.5 rounded-full`}
            >
              En Yeniler
            </li>
          {cat?.map((item, index) => (
            <li
              key={index}
              onClick={() => changeSubCategory(item.tag)}
              className={`hover:bg-black hover:text-white border p-1.5 rounded-full`}
            >
              {item.name}
            </li>
          ))}
        </ul>
        {subCategories && (
        <ul className="flex my-4 space-x-4 overflow-x-auto text-center text-[11px] snap-x scrollbar-hide snap-mandatory">
          {subCategories?.map((item, index) => (
            <li
              onClick={()=> getProductsByCategory(item.tag)}
              key={index}
              className={`hover:bg-black hover:text-white border p-1.5 rounded-full`}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
      </div>
  );
}
