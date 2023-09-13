"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import SingleProductList from "./SingleProductList";
import { useParams } from "next/navigation";
import {
  useAddToVisitedMutation,
  useGetVisitedProductsQuery,
} from "@/store/features/api/visitedProductsAPI";

const LastVisitedProducts = ({ visitedProductId }) => {
  const { locale } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [addToVisited] = useAddToVisitedMutation();
  const { data, isLoading } = useGetVisitedProductsQuery({ locale });
  const visitedProducts = data?.data || [];
  // console.log(visitedProducts);

  // Adding product to visited list
  useEffect(() => {
    if (visitedProductId && user) {
      addToVisited({ product_id: visitedProductId, date: new Date() });
      // .unwrap()
      // .then((response) => {
      //   // Handle the successful response if necessary
      //   console.log(response);
      // })
      // .catch((error) => {
      //   // Handle the error if necessary
      //   console.log(error);
      // });
    }
  }, [visitedProductId, user, addToVisited]);

  if (!user) return null;

  return (
    <>
      <div className="container ">
        <div className="latest-viewed-products bg-slate-50 border border-slate-100 rounded-xl pt-8 mb-14">
          <div className="sec-heading w-full flex justify-between items-center border-b border-slate-200 pb-3">
            <h2 className="sec-title">সর্বশেষ যে প্রোডাক্ট গুলো দেখেছেন</h2>
          </div>

          <div className="mt-6 ">
            <div className="products-wpr grid grid-cols-4 gap-4">
              {visitedProducts?.map((product, i) => (
                <div key={i}>
                  <SingleProductList isHistory={true} product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LastVisitedProducts;
