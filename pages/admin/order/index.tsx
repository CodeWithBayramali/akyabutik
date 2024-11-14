import React from "react";
import '../../../app/globals.css'
import { Provider } from "react-redux";
import store from "../../../redux/store";
import AdminSidebar from "components/admin/admin-sidebar";
import OrderList from "components/admin/order-list";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export default function index() {
  return (
    <div className="flex flex-row bg-[#f9fafb]">
      <Provider store={store}>
        <div className="w-2/12">
          <AdminSidebar />
        </div>
        <div className="w-10/12 p-8">
            <OrderList />
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