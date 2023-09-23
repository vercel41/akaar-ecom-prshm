"use client";

import React from "react";
import NoItems from "../NoItems";
import { useGetOrdersQuery } from "@/store/features/api/orderAPI";

import ItemsListLoader from "@/components/elements/loaders/ItemsListLoader";
import { getFormattedDate } from "@/utils/formatDate";
import Link from "next/link";
import { AiFillEye } from "react-icons/ai";

const orders = [
  {
    id: 1,
    invoice_no: "INV001",
    sale_date: "2023-09-23",
    status: "Shipped",
    total_amount: 100.5,
    due_amount: 25.25,
    shipping: {
      address: "123 Main St, Exampleville, CA 12345",
      method: "Express",
    },
    total_product: 5,
    payment_type: "Credit Card",
  },
  {
    id: 2,
    invoice_no: "INV002",
    sale_date: "2023-09-24",
    status: "Processing",
    total_amount: 75.0,
    due_amount: 0,
    shipping: {
      address: "456 Elm St, Sampletown, NY 54321",
      method: "Standard",
    },
    total_product: 3,
    payment_type: "PayPal",
  },
  {
    id: 3,
    invoice_no: "INV003",
    sale_date: "2023-09-25",
    status: "Delivered",
    total_amount: 200.75,
    due_amount: 0,
    shipping: {
      address: "789 Oak St, Demo City, TX 67890",
      method: "Express",
    },
    total_product: 8,
    payment_type: "Cash On Delivery",
  },
];

const MyOrders = () => {
  const { data: ordersData, isLoading } = useGetOrdersQuery();
  const myOrders = ordersData?.data || [];
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
      ) : orders.length ? (
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
                        <th scope="col" class="border-r px-6 py-4">
                          View
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <tr key={index} class="border-b">
                          <td class="whitespace-nowrap border-r px-6 py-4 font-medium">
                            {index + 1}
                          </td>
                          <td class="whitespace-nowrap border-r px-6 py-4">
                            <Link
                              href={`/dashboard/my-orders/details/${order.id}`}
                              className="text-slate-600 hover:text-secondary"
                            >
                              #{order.invoice_no}
                            </Link>
                          </td>
                          <td class="whitespace-nowrap border-r px-6 py-4">
                            {getFormattedDate(order.sale_date)}
                          </td>
                          <td class="whitespace-nowrap border-r px-6 py-4">
                            {order.status}
                          </td>
                          <td class="whitespace-nowrap border-r px-6 py-4">
                            {order.payment_type}
                          </td>
                          <td class="whitespace-nowrap border-r px-6 py-4">
                            <Link
                              href={`/dashboard/my-orders/details/${order.id}`}
                              className="text-slate-600 hover:text-secondary"
                            >
                              <AiFillEye />
                            </Link>
                          </td>
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
