import AdminSidebar from 'components/admin/admin-sidebar';
import '../../app/globals.css'
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import CreateProduct from 'components/admin/create-product';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import ProductList from 'components/admin/product-list';
import OpenStockModal from 'components/admin/open-stock-modal';


export default function Dashboard() {

  return (
    <div className="flex flex-row bg-[#f9fafb]">
      <Provider store={store}>
      <div className='w-2/12'>
      <AdminSidebar />
      </div>
      <div className='flex flex-col px-4 py-8 w-4/12 border-r max-h-screen overflow-y-auto'>
          <CreateProduct />
      </div>
      <div className='w-6/12 max-h-screen overflow-y-auto'>
          <ProductList />
      </div>
      </Provider>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
