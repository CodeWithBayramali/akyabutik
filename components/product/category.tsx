"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Category() {
  const [categoryOpenTab, setCategoryOpenTab] = useState("");

  return (
    <div className="flex-none w-44">
      <ul className="flex flex-col gap-y-2 text-gray-500">
        <li>
          <button className="text-sm">En Yeniler</button>
        </li>
        <li>
          <button className="text-sm flex flex-row items-center justify-between">
            <p>Elbise</p>
          </button>
        </li>
        <li>
          <button
            onClick={() => setCategoryOpenTab("ust-giyim")}
            className={`${categoryOpenTab === "ust-giyim" && "text-blue-600"} text-sm flex flex-row gap-x-4 items-center justify-between`}
          >
            <p>Üst Giyim</p>
            <MdKeyboardArrowDown />
          </button>
            <ul className="flex flex-col text-xs ml-2 gap-y-2 my-2">
              <li className="hover:text-blue-600 cursor-pointer">Bluz</li>
              <li className="hover:text-blue-600 cursor-pointer">Gömlek</li>
              <li className="hover:text-blue-600 cursor-pointer">Sweatshirt</li>
              <li className="hover:text-blue-600 cursor-pointer">T-shirt</li>
              <li className="hover:text-blue-600 cursor-pointer">
                Kazaklar/Triko
              </li>
              <li className="hover:text-blue-600 cursor-pointer">Hırka</li>
              <li className="hover:text-blue-600 cursor-pointer">Atlet</li>
              <li className="hover:text-blue-600 cursor-pointer">Crop</li>
            </ul>
        </li>
        <li>
          <button
            onClick={() => setCategoryOpenTab("alt-giyim")}
            className={`${categoryOpenTab === "alt-giyim" && "text-blue-600"} text-sm flex flex-row gap-x-4 items-center justify-between`}
          >
            <p>Alt Giyim</p>
            <MdKeyboardArrowDown />
          </button>
            <ul className="flex flex-col text-xs ml-2 gap-y-2 my-2">
              <li className="hover:text-blue-600 cursor-pointer">Pantolon</li>
              <li className="hover:text-blue-600 cursor-pointer">Tayt</li>
              <li className="hover:text-blue-600 cursor-pointer">Tulum</li>
              <li className="hover:text-blue-600 cursor-pointer">Jean</li>
              <li className="hover:text-blue-600 cursor-pointer">Etek</li>
              <li className="hover:text-blue-600 cursor-pointer">Şort</li>
            </ul>
        </li>
        <li>
          <button 
            onClick={() => setCategoryOpenTab("dis-giyim")}
            className={`${categoryOpenTab === "dis-giyim" && "text-blue-600"} text-sm flex flex-row gap-x-4 items-center justify-between`}
          >
            <p>Dış Giyim</p>
            <MdKeyboardArrowDown />
          </button>
            <ul className="flex flex-col text-xs ml-2 gap-y-2 my-2">
              <li className="hover:text-blue-600 cursor-pointer">Pantolon</li>
              <li className="hover:text-blue-600 cursor-pointer">Tayt</li>
              <li className="hover:text-blue-600 cursor-pointer">Tulum</li>
              <li className="hover:text-blue-600 cursor-pointer">Jean</li>
              <li className="hover:text-blue-600 cursor-pointer">Etek</li>
              <li className="hover:text-blue-600 cursor-pointer">Şort</li>
            </ul>
        </li>
      </ul>
    </div>
  );
}
