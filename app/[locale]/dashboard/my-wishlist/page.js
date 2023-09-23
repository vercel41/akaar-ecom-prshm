"use client";
import React from "react";
import WishListCard from "./WishListCard";
import { useParams } from "next/navigation";
import { useGetWishListQuery } from "@/store/features/api/wishListAPI";
import NoItems from "../NoItems";
import ItemsListLoader from "@/components/elements/loaders/ItemsListLoader";

const MyWishList = () => {
  const { locale } = useParams();
  const { data, isLoading } = useGetWishListQuery({ locale });
  const wishedProducts = data?.data || [];
  return (
    <div className="p-6">
      <h2 className="text-slate-600 text-2xl text-center md:text-start">
        Wishlist ({wishedProducts.length}) items
      </h2>
      {isLoading ? (
        <div className="py-4">
          <ItemsListLoader itemHeight={90} viewBoxWidth={900} />
        </div>
      ) : wishedProducts.length ? (
        <div className="mt-4">
          {wishedProducts.map((product) => (
            <WishListCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <NoItems />
      )}
    </div>
  );
};

export default MyWishList;
