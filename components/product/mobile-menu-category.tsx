import React from 'react'

export default function MobileMenuCategory() {
  return (
    <div className='container sm:flex flex-row mb-12 md:hidden'>
        <ul className='grid grid-cols-4 gap-x-1.5 text-center text-[11px] flex-nowrap'>
            <li className={`hover:bg-black hover:text-white border p-1.5 rounded-full`}>Tüm Ürünler</li>
            <li className='border p-1.5 rounded-full'>Elbise</li>
            <li className='border p-1.5 rounded-full'>Üst giyim</li>
            <li className='border p-1.5 rounded-full'>Alt giyim</li>
        </ul>
    </div>
  )
}
