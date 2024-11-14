import React, { useState } from "react";
import { OrderProduct } from "types";
import Image from "next/image";

interface OpenStockModalProps {
  isOpen: boolean;
  closeModal: () => void;
  orderDetail: OrderProduct | undefined;
}

export default function OrderDetailModal({
  orderDetail,
  isOpen,
  closeModal,
}: OpenStockModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement;
    if (target.id === "modal-overlay") {
      startClosingAnimation();
    }
  };

  const startClosingAnimation = () => {
    setIsClosing(true);
    // Animasyon süresi kadar bekleyip modalı kapat
    setTimeout(() => {
      setIsClosing(false);
      closeModal(); // Modalı tamamen kapatma
    }, 300); // Animasyon süresi
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleOutsideClick}
      className={`fixed inset-0 z-50 flex bg-black items-center justify-end transition-opacity 
        duration-300 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } bg-opacity-25`}
    >
      {/* Modal İçeriği */}
      <div
        className={`w-[600px] h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen && !isClosing ? "translate-x-0" : "translate-x-full"
        } relative`}
      >
        {/* Modal Kapatma Butonu */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={startClosingAnimation} // Kapatma butonuna basınca kapanma animasyonu başlatılır
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col gapy-y-6 mt-12 h-full overflow-y-auto">
          <h1 className="text-center text-xl text-blue-600">Sipariş Detayı</h1>

          <div className="flex flex-col p-6">
            {
              orderDetail?.orderProducts.map((item,index)=> (
                <div key={index} className="flex flex-row items-center w-full my-2">
                <div className="relative h-16 w-12 hover:h-80 hover:w-80 transition-all">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.imageUrl}`}
                    alt="product.jpg"
                  />
                </div>
                <div className="flex flex-col w-full ml-6">
                  <div className="flex flex-row items-center justify-between w-full">
                    <p className="text-sm font-semibold">{item.productName}</p>
                  </div>
                  <div className="w-full">
                    <p className="text-xs font-semibold text-gray-700">Beden - {item.size}</p>
                    <p className="text-xs font-semibold text-gray-700">Renk - {item.color}</p>
                    <p className="text-xs font-semibold text-gray-700">Adet - {item.quantity}</p>
                  </div>
                </div>
              </div>
              ))
            }
          </div>

          <div className="flex flex-col gap-y-3 p-6 border-t mt-4">
            <h1 className="font-bold">Adres Bilgisi:</h1>
            <div className="flex flex-row justify-between">
              <label>Şehir:</label>
              <label>{orderDetail?.address.city}</label>
            </div>
            <div className="flex flex-row justify-between">
              <label>İlçe:</label>
              <label>{orderDetail?.address.state}</label>
            </div>
            <div className="flex flex-row justify-between">
              <label>Posta Kodu:</label>
              <label>{orderDetail?.address.zipCode ? orderDetail.address.zipCode: '-'}</label>
            </div>
            <div className="flex flex-row justify-between">
              <label>Apartman vb.:</label>
              <label>{orderDetail?.address.apartment}</label>
            </div>
            <div className="grid grid-cols-2">
              <label>Detaylı Adres:</label>
              <label className="">{orderDetail?.address.addressDetails}</label>
            </div>
          </div>

          <div className="flex flex-col gap-y-3 p-6 border-t mt-4">
            <h1 className="font-bold">İletişim:</h1>
            <div className="flex flex-row justify-between">
              <label>E-mail:</label>
              <label>{orderDetail?.email}</label>
            </div>
            <div className="flex flex-row justify-between">
              <label>Telefon:</label>
              <label>{orderDetail?.phoneNumber}</label>
            </div>
          </div>
          <div className="p-6 text-white bg-blue-500 flex flex-row items-center justify-between">
            <label>Durum</label>
            <div className="flex flex-row items-center gap-x-2">
            <select className="border p-1 my-2 bg-slate-500 rounded-lg">
              <option>Durum Güncelle</option>
            </select>
            <label className="font-bold">{
              orderDetail?.status ==='NEW' && 'YENİ SİPARİŞ'  ||
              orderDetail?.status ==='SHIPPED' && 'GÖNDERİLDİ'
            }
            </label>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
