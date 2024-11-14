import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import Image from "next/image";
import { getOrdersDispatch } from "../../redux/orderSlice";
import { OrderProduct } from "types";
import { dateConverter } from "util/dateConverter";
import OrderDetailModal from "./order-detail-modal";

export default function OrderList() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders } = useSelector((state: RootState) => state.order);
  const [orderDetail, setOrderDetail] = useState<OrderProduct>();
  const [isOpen,setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    dispatch(getOrdersDispatch(0, 12));
  }, [dispatch]);

  const handleOpenOrderModal = (values:OrderProduct) => {
    setOrderDetail(values)
    setIsOpen(!isOpen)
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="h-max-screen">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
              >
                Ad Soyad
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
              >
                İletişim
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
              >
                Toplam Fiyat
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
              >
                Sipariş Tarihi
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
            {orders?.map((item, index) =>
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {item.nameSurname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    {item.email} / {item.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    ₺ {item.totalPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    {dateConverter(item.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-end text-xs font-medium">
                    <button
                      onClick={() => handleOpenOrderModal(item)}
                      type="button"
                      className="inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg text-blue-600"
                    >
                      Detay
                    </button>
                  </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      <OrderDetailModal orderDetail={orderDetail} closeModal={closeModal} isOpen={isOpen} />
    </>
  );
}
