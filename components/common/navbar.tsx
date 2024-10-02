"use client";
import OpenCartModal from "components/cart/open-cart-modal";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { RiMenu4Fill } from "react-icons/ri";
import { RiCloseLargeLine } from "react-icons/ri";
import { Dancing_Script } from "next/font/google";

const dancing_script = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);

  const changeNavbarColor = () => {
    if (window.scrollY >= 50) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavbarColor);
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`${mobile ? "bg-white transition-all backdrop-blur-lg bg-opacity-70 rounded-b-3xl py-6 z-30 fixed top-0 w-full" : "bg-transparent py-6 z-30 fixed top-0 w-full"}`}
      >
        <div className="container flex flex-row items-center justify-between">
          <span className="flex flex-row items-center gap-x-12">
            <Image
              src="/images/akya-logo.png"
              width={100}
              height={100}
              alt="akya_logo.png"
            />
            <ul
              className={`${dancing_script.className} md:flex flex-row items-center sm:hidden gap-x-8`}
            >
              <li>
                <Link
                  href="/all-products"
                  className="text-gray-600 text-2xl font-bold hover:text-indigo-600 transition-all"
                >
                  Tüm Ürünler
                </Link>
              </li>
              <li>
                <Link
                  href={`/men`}
                  className="text-gray-600 font-bold text-2xl hover:text-indigo-600 transition-all"
                >
                  Erkek
                </Link>
              </li>
              <li>
                <Link
                  href={`/woman`}
                  className="text-gray-600 font-bold text-2xl hover:text-indigo-600 transition-all"
                >
                  Kadın
                </Link>
              </li>
            </ul>
          </span>
          <div className="flex items-center justify-center gap-x-8">
            <button className="relative rounded-lg">
              <FiShoppingCart onClick={toggleModal} size={28} />
              <span className="flex items-center justify-center absolute px-[5px] -right-2 -top-2 bg-blue-600 rounded-full text-white text-xs">
                1
              </span>
            </button>
            {open ? (
              <RiCloseLargeLine onClick={() => setOpen(!open)} size={28} />
            ) : (
              <RiMenu4Fill
                className="md:hidden sm:block"
                onClick={() => setOpen(!open)}
                size={28}
              />
            )}
          </div>
        </div>
      </nav>
      <ul
        className={`${open ? `${dancing_script.className} fixed gap-y-8 bg-white flex h-screen flex-col backdrop-blur-lg bg-opacity-70 z-20 items-center justify-center top-0 w-full` : "hidden"}`}
      >
        <li>
          <Link
            href="/all-products"
            className="text-gray-600 text-3xl font-bold hover:text-indigo-600 transition-all"
          >
            Tüm Ürünler
          </Link>
        </li>
        <li>
          <Link
            href={`/men`}
            className="text-gray-600 text-3xl font-bold hover:text-indigo-600 transition-all"
          >
            Erkek
          </Link>
        </li>
        <li>
          <Link
            href={`/woman`}
            className="text-gray-600 text-3xl font-bold hover:text-indigo-600 transition-all"
          >
            Kadın
          </Link>
        </li>
      </ul>
      <OpenCartModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}
