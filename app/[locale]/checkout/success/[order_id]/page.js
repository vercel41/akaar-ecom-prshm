"use client";
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import { useGetOrderByIdQuery } from "@/store/features/api/orderAPI";
import ArticleLoader from "@/components/elements/loaders/ArticleLoader";
import { getBdFormattedDate } from "@/utils/formatDate";
const Lottie = dynamic(() => import("lottie-react"));
import successAnimation from "@/public/assets/lottie/success_2.json";

const OrderSuccess = ({ params }) => {
  const { order_id, locale } = params;
  const { data: orderData, isLoading } = useGetOrderByIdQuery({
    order_id,
    locale,
  });
  const order = orderData?.sale || null;
  // console.log(order);
  return (
    <div className="container min-h-screen">
      <div className="w-full md:w-[540px] mx-auto mt-12 lg:mt-28  mb-12 p-5 border border-slate-200">
        <div className="text-center font-bold">
          <div className="flex-center h-28">
            <Lottie
              animationData={successAnimation}
              className="h-full"
              loop={false}
            />
          </div>
          <h1 className="text-slate-800 text-3xl font-title">
            Order Successful!
          </h1>
          <h3 className="text-slate-800 text-2xl my-2">
            Thank you for ordering
          </h3>
        </div>
        {isLoading ? (
          <ArticleLoader />
        ) : (
          <div className="order-info">
            <div className="order-info bg-slate-50 py-4 m-4 border-y border-slate-200">
              <div className="flex-between my-2">
                <p>Invoice No</p>
                <p>{order?.invoice_no}</p>
              </div>
              <div className="flex-between my-2">
                <p>Date</p>
                <p>{getBdFormattedDate(order?.sale_date)}</p>
              </div>
              <div className="border-b border-slate-700 my-2"></div>
              <div className="flex-between my-2 font-bold">
                <p>
                  Amount{" "}
                  {order?.due_amount ? (
                    <span className="bg-red-100 px-2 text-red-500">Due</span>
                  ) : (
                    <span className="bg-green-100 px-2 text-green-500">
                      Paid
                    </span>
                  )}
                </p>
                <p>Tk. {order?.due_amount}</p>
              </div>
            </div>
            <div className="actions px-4 my-6 flex flex-col md:flex-row gap-4 justify-between items-center">
              <Link
                href={`/dashboard/my-orders/details/${order_id}`}
                className="border border-primary py-3 w-full px-6 text-center active:scale-95"
              >
                View Order
              </Link>
              <Link
                href={"/products"}
                className="bg-primary py-3 w-full px-6 text-white text-center active:scale-95"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSuccess;
