import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateStockDispatch } from '../../redux/productSlice';
import { AppDispatch } from 'redux/store';
import { Product } from 'types';

interface OpenStockModalProps {
  isOpen: boolean;
  closeModal: () => void;
  colorSize: Product | undefined;
}

export default function OpenStockModal({ isOpen, closeModal, colorSize }: OpenStockModalProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [updatedStock, setUpdatedStock] = useState<{ [key: string]: number }>({});

  const handleInputChange = (colorWeightKey: string, value: string) => {
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      setUpdatedStock((prev) => ({
        ...prev,
        [colorWeightKey]: numericValue,
      }));
    }
  };

  const handleUpdateStock = () => {
    if (colorSize) {
      const newColorSize = colorSize.colorSize.map((item) => {
        const key = `${item.colorName}-${item.weight}`;
        const additionalStock = updatedStock[key] || 0;
        return {
          ...item,
          count: item.count + additionalStock, // Yeni stok güncelleme
        };
      });
      
      dispatch(updateStockDispatch({
        ...colorSize,
        stock: newColorSize.reduce((total,item)=> { return total + item.count;},0),
        colorSize: newColorSize
      }))
      
    }
  };

  return (
    <div
      id="modal-overlay"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.id === 'modal-overlay') {
          closeModal();
        }
      }}
      className={`fixed inset-0 z-50 flex bg-black items-center justify-end transition-opacity 
        duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} bg-opacity-25`}
    >
      <div
        className={`w-80 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } relative`}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={closeModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex flex-col mt-12 px-4">
          <h1 className="text-center text-gray-500 text-2xl my-12">Stok Güncelle</h1>
          <div className="flex flex-col gap-y-4">
            {colorSize?.colorSize.map((item, index) => {
              const key = `${item.colorName}-${item.weight}`;
              return (
                <span key={index} className="flex flex-row items-center justify-between">
                  <label>
                    {item.colorName} - {item.weight} : {item.count}
                  </label>
                  <input
                    className="w-16 border outline-none"
                    type="number"
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    placeholder="0"
                  />
                  <button onClick={handleUpdateStock} className="bg-blue-600 rounded-lg w-6 h-6 text-white flex items-center justify-center">+</button>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}