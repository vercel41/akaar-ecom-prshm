"use client";

import React from "react";
import NoItems from "../NoItems";
import { useGetOrdersQuery } from "@/store/features/api/orderAPI";

import ItemsListLoader from "@/components/elements/loaders/ItemsListLoader";
import { getFormattedDate } from "@/utils/formatDate";
import Link from "next/link";
import handleSSLOrderPayLater from "@/utils/sslPay";
import { useDispatch } from "react-redux";
import { setGlobalLoader } from "@/store/features/commonSlice";
// import { AiFillEye } from "react-icons/ai";

const MyOrders = () => {
  const { data: ordersData, isLoading } = useGetOrdersQuery();
  const myOrders = ordersData?.data || [];
  const dispatch = useDispatch();
  // console.log(myOrders);
  return (
    <div className="py-6">
      <h2 className="text-slate-600 text-2xl text-center md:text-start">
        Recent Order History
      </h2>

      {isLoading ? (
        <div className="py-4">
          <ItemsListLoader
            itemHeight={110}
            numItems={2}
            noImage={true}
            viewBoxWidth={900}
          />
        </div>
      ) : myOrders.length ? (
        <div className="py-3">
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full border text-center text-sm font-light">
                    <thead class="border-b bg-primary font-medium text-white">
                      <tr>
                        <th scope="col" class="border-r px-6 py-3">
                          SL
                        </th>
                        <th scope="col" class="border-r px-6 py-3">
                          Invoice_No
                        </th>
                        <th scope="col" class="border-r px-6 py-3">
                          Date
                        </th>
                        <th scope="col" class="border-r px-6 py-3">
                          Status
                        </th>
                        <th scope="col" class="border-r px-6 py-3">
                          Payment type
                        </th>
                        {/* <th scope="col" class="border-r px-6 py-4">
                          View
                        </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {myOrders.map((order, index) => (
                        <tr key={index} class="border-b">
                          <td class="whitespace-nowrap border-r px-6 py-4 font-medium">
                            {index + 1}
                          </td>
                          <td class="whitespace-nowrap border-r px-6 py-4">
                            <Link
                              href={`/dashboard/my-orders/details/${order.id}`}
                              className="text-secondary"
                            >
                              #{order.invoice_no}
                            </Link>
                          </td>
                          <td class="whitespace-nowrap border-r px-6 py-4">
                            {getFormattedDate(order.sale_date)}
                          </td>
                          <td class="whitespace-nowrap border-r px-6 py-4">
                            {order.status === "Delivery"
                              ? "Product on the way to shipment"
                              : order.status}
                          </td>
                          <td class="whitespace-nowrap border-r px-6 py-4">
                            {order.payment_type === "COD" ? (
                              "Cash on Delivery"
                            ) : order.due_amount > 0 ? (
                              <button
                                onClick={() =>
                                  handleSSLOrderPayLater(order.id, (loading) =>
                                    dispatch(setGlobalLoader(loading))
                                  )
                                }
                              >
                                Online{" "}
                                <span className="text-red-500 text-xs">
                                  (Payment Failed)
                                </span>
                              </button>
                            ) : (
                              "Online"
                            )}
                          </td>
                          {/* <td class="whitespace-nowrap border-r px-6 py-4">
                            <Link
                              href={`/dashboard/my-orders/details/${order.id}`}
                              className="text-slate-600 hover:text-secondary"
                            >
                              <AiFillEye />
                            </Link>
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoItems title={"No Orders"} />
      )}
    </div>
  );
};

export default MyOrders;
