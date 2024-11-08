'use client'
import BackToTop from 'components/common/back-to-top'
import Footer from 'components/common/footer'
import Navbar from 'components/common/navbar'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { SessionProvider } from 'next-auth/react'

export default function Root({children}: {children:React.ReactNode}) {

  return (
    <>
    <Provider store={store}>
      <SessionProvider>
       <Navbar />
      {children}
      <BackToTop />
      <Footer />
      </SessionProvider>
      </Provider>
    </>
  )
}
