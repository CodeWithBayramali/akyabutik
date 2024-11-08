"use client";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { RxExit } from "react-icons/rx";
import { IoHomeOutline, IoListOutline } from "react-icons/io5";
import { FaBoxesPacking } from "react-icons/fa6";
import { BsPlusSquare } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import Link from "next/link";


export default function AdminSidebar() {

    const [link,setLink] = useState('list')

  return (
    <div className="flex flex-col relative border-r h-screen border-gray-300">
      <ul className="flex flex-col gap-y-4 p-3">
        <li className="flex items-center gap-x-2">
            <Link className="flex flex-row items-center w-full hover:bg-gray-300 rounded-lg p-2 gap-x-2 text-xl font-thin" href='/'>
            <IoHomeOutline size={24} />
                Anasayfa
            </Link>
        </li>
        <li className={`${link === 'list' && 'bg-gray-300 rounded-lg'} "flex items-center gap-x-2"`}>
            <Link className="flex flex-row items-center w-full hover:bg-gray-300 rounded-lg p-2 gap-x-2 text-xl font-thin" href='/'>
            <IoListOutline size={24} />
                Ürün Listesi
            </Link>
        </li>
        <li className="flex items-center gap-x-2">
            <Link className="flex flex-row items-center w-full hover:bg-gray-300 rounded-lg p-2 gap-x-2 text-xl font-thin" href='/'>
            <FaBoxesPacking size={24} />
                Siparişler
            </Link>
        </li>
        <li className="flex items-center gap-x-2">
        <Link className="flex flex-row items-center w-full hover:bg-gray-300 rounded-lg p-2 gap-x-2 text-xl font-thin" href='/'>
            <GrMoney size={24} />
                Muhasebe
            </Link>
        </li>
      </ul>
      <div className="absolute bottom-0 w-full">
        <button onClick={()=> signOut()} className="bg-red-600 transition-all hover:gap-x-4 gap-x-2 py-4 text-white w-full flex justify-center">
          <RxExit size={24} /> Çıkış
        </button>
      </div>
    </div>
  );
}
