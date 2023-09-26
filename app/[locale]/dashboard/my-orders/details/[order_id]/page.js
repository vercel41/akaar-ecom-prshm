"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

// import { HiArrowLongLeft } from "react-icons/hi2";
import { FaCloudDownloadAlt } from "react-icons/fa";
import OrderTracking from "./OrderTracking";
import SaleProductCard from "./SaleProductCard";
import { useGetOrderByIdQuery } from "@/store/features/api/orderAPI";
import ItemsListLoader from "@/components/elements/loaders/ItemsListLoader";
import { getFormattedDate } from "@/utils/formatDate";
import { setGlobalLoader } from "@/store/features/commonSlice";
import handleSSLOrderPayLater from "@/utils/sslPay";
import locationImage from "@/public/assets/images/locationImage.png";

const OrderDetail = ({ params }) => {
  const { order_id, locale } = params;
  const { data: orderData, isLoading } = useGetOrderByIdQuery({
    order_id,
    locale,
  });
  const dispatch = useDispatch();
  const sale = orderData?.sale || {};
  const saleProducts = orderData?.saleProducts || [];

  return (
    <div className="md:px-10 py-6">
      <h2 className="text-slate-600 text-2xl text-center md:text-start">
        Order View
      </h2>
      <div className="content text-slate-700">
        {/* <OrderTracking orderData={orderData} isLoading={isLoading} /> */}
        <div className="bg-white py-4 mt-5">
          <h3 className="text-xl font-bold font-title mb-4">Products</h3>
          {isLoading ? (
            <ItemsListLoader numItems={2} viewBoxWidth={900} />
          ) : (
            saleProducts.map((saleProduct, index) => (
              <SaleProductCard key={index} saleProduct={saleProduct} />
            ))
          )}
        </div>
        <div className="bg-white py-4 mt-5">
          <h3 className="text-xl font-bold font-title mb-4">
            Shipping Address
          </h3>
          {isLoading ? (
            <ItemsListLoader numItems={1} viewBoxWidth={900} />
          ) : (
            <div className="flex gap-6">
              <div className="bg-slate-100 flex justify-center items-center p-2">
                <Image
                  src={locationImage}
                  height={44}
                  width={44}
                  className="h-11 w-11"
                  alt="location-icon"
                />
              </div>
              <div>
                <h4 className="font-bold">{sale?.shipping?.name}</h4>
                <p>{sale?.shipping?.phone}</p>
                <p>{sale?.shipping?.address}</p>
              </div>
            </div>
          )}
        </div>
        <div className="py-4 bg-white mt-5">
          <h3 className="text-xl font-bold font-title mb-4">
            Payment Information
          </h3>
          {isLoading ? (
            <ItemsListLoader numItems={2} noImage={true} viewBoxWidth={900} />
          ) : (
            <>
              <div className="flex-between my-2">
                <p>Invoice No</p>
                <p>{sale.invoice_no}</p>
              </div>
              <div className="flex-between my-2">
                <p>Date</p>
                <p>{getFormattedDate(sale.sale_date)}</p>
              </div>

              <div className="flex-between my-2">
                <p>Total</p>
                <p>Tk.{sale.sub_total}</p>
              </div>
              <div className="flex-between my-2">
                <p>Discount Amount</p>
                <p className="text-red-500">-Tk.{sale.discount_amount}</p>
              </div>
              <div className="border-b border-slate-300 my-2"></div>
              <div className="flex-between my-2">
                <p>Total with Discount</p>
                <p>Tk.{sale.sub_total - sale.discount_amount}</p>
              </div>
              <div className="flex-between my-2">
                <p>Delivery Charge</p>
                <p>Tk.{sale.shipping?.delivery_charge}</p>
              </div>
              <div className="border-b border-slate-900 my-2"></div>
              <div className="flex-between my-2 font-bold">
                <p>
                  Grand Total{" "}
                  <span
                    className={`px-2 ${
                      sale.due_amount > 0
                        ? "text-red-500 bg-red-100"
                        : "text-green-500 bg-green-100"
                    }`}
                  >
                    {sale.due_amount > 0
                      ? sale.payment_type !== "COD"
                        ? "Payment Failed"
                        : "Due"
                      : "Paid"}
                  </span>
                </p>
                <p>
                  Tk.{sale.due_amount ? sale.due_amount : sale.total_amount}
                </p>
              </div>
              <div className="actions mt-14 flex justify-center  items-center">
                {sale.due_amount > 0 && sale.payment_type !== "COD" ? (
                  <button
                    onClick={() =>
                      handleSSLOrderPayLater(sale.id, (loading) =>
                        dispatch(setGlobalLoader(loading))
                      )
                    }
                    className="border border-primary py-2 px-4 mb-3 mt-5 text-center active:scale-95"
                  >
                    Make Payment
                  </button>
                ) : (
                  <a
                    target="_blank"
                    href={`${process.env.serverBaseUrl}/in/${sale.customer?.id}/${sale.id}/sale`}
                    className="border border-primary p-3 block text-center hover:text-secondary mb-3 mt-5"
                  >
                    <FaCloudDownloadAlt size={24} className="mr-2" /> Download
                    Invoice
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
