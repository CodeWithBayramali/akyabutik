'use client'
import BackToTop from 'components/common/back-to-top'
import Footer from 'components/common/footer'
import Navbar from 'components/common/navbar'
import React from 'react'
import { usePathname } from 'next/navigation'

export default function Root({children}: {children:React.ReactNode}) {
    const pathName = usePathname()
    const hideLayout = pathName.startsWith('/studio'); // Studio sayfası
    console.log(pathName)
  return (
    <>
       {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <BackToTop />}
      {!hideLayout && <Footer />}
    </>
  )
}
