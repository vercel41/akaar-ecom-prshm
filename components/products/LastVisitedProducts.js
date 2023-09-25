"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import {
  useAddToVisitedMutation,
  useGetVisitedProductsQuery,
} from "@/store/features/api/visitedProductsAPI";
import SingleProduct from "./SingleProduct";

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
    <section id="visit-history mt-28">
      <div className="container py-14">
        <h2 className="sec-title text-center mb-8">Recently Viewed</h2>
        <div className="category-products"></div>
        <div className="products-wpr grid grid-cols-4 gap-4">
          {visitedProducts?.map((product, i) => (
            <div key={i}>
              <SingleProduct product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LastVisitedProducts;
