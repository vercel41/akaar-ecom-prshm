"use client";
import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import ArticleLoader from "@/components/elements/loaders/ArticleLoader";
import { useGetOrderByIdQuery } from "@/store/features/api/orderAPI";
import { ImWarning } from "react-icons/im";
import handleSSLOrderPayLater from "@/utils/sslPay";
import { setGlobalLoader } from "@/store/features/commonSlice";

const PaymentFail = ({ params }) => {
  const dispatch = useDispatch();
  const { order_id, locale } = params;
  const { data: orderData, isLoading } = useGetOrderByIdQuery({
    order_id,
    locale,
  });
  const order = orderData?.sale || null;

  return (
    <div className="container min-h-screen">
      <div className="w-[540px] mx-auto my-12 p-5 rounded-lg font-title">
        <div className="text-center">
          <div className="flex-center my-3">
            <div className="p-3 bg-red-100 rounded-[100%]">
              <div className="text-red-500 rounded-[100%] p-5 w-20">
                <ImWarning size={36} />
              </div>
            </div>
          </div>
          <h1 className="text-red-500 text-4xl mt-8 font-bold">
            পেমেন্ট অসম্পূর্ণ
          </h1>
          <h3 className="text-slate-600 mt-2 text-xl">
            সততা স্টোর থেকে আপনার অর্ডার নিশ্চিত করা হয়েছে, কিন্তু কোন কারণে
            পেমেন্ট ব্যর্থ হয়েছে
          </h3>
        </div>
        {isLoading ? (
          <ArticleLoader />
        ) : (
          <>
            <div className="order-info bg-slate-100 p-4 my-4 text-center font-bold text-slate-600">
              <p>আপনার অর্ডার আইডি: #{order?.invoice_no}</p>
              <p>প্রদেয় পরিমান: ৳{order?.due_amount}</p>
            </div>
            <div className="text-center text-slate-600 text-xl">
              <h3>
                পেমেন্ট সম্পূর্ণ করতে পেমেন্ট বাটনে ক্লিক করুন <br />
                অথবা, অর্ডারটির{" "}
                <Link
                  href={`/dashboard/my-orders/details/${order_id}`}
                  className="text-secondary-700 active:scale-95 underline"
                >
                  বিস্তারিত দেখুন
                </Link>
              </h3>
            </div>
            <div className="order-info">
              <div className="action my-5 flex justify-center">
                <button
                  onClick={() =>
                    handleSSLOrderPayLater(order?.id, (loading) =>
                      dispatch(setGlobalLoader(loading))
                    )
                  }
                  className="bg-primary py-3 px-6 text-white rounded-lg text-center active:scale-95"
                >
                  পেমেন্ট করুন
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentFail;
