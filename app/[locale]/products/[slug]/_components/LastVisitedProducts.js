"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import {
  useAddToVisitedMutation,
  useGetVisitedProductsQuery,
} from "@/store/api/visitedProductsAPI";
import ProductCard from "@/components/cards/ProductCard";
import { siteConfig } from "@/config/site";

const LastVisitedProducts = ({ visitedProduct }) => {
  const { translations } = useSelector((state) => state.common);
  const { locale } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [addToVisited] = useAddToVisitedMutation();
  const { data, isLoading } = useGetVisitedProductsQuery({ locale });
  const [localVisitedProducts, setLocalVisitedProducts] = useState([]);
  const [mergedProducts, setMergedProducts] = useState([]);

  // Load from localStorage when component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProducts = localStorage.getItem("recentlyViewed");
      if (storedProducts) {
        try {
          setLocalVisitedProducts(JSON.parse(storedProducts));
        } catch (e) {
          console.error("Error parsing recentlyViewed from localStorage", e);
          localStorage.removeItem("recentlyViewed");
        }
      }
    }
  }, []);

  // Adding product to visited list (always store in localStorage, and also in API if logged in)
  useEffect(() => {
    if (visitedProduct?.id) {
      // Prepare product data for storage
      const productToAdd = {
        id: visitedProduct.id,
        image: visitedProduct.image || "",
        product_name: visitedProduct.product_name || visitedProduct.name || "",
        slug: visitedProduct.slug || "",
        new_price: visitedProduct.new_price,
        old_price: visitedProduct.old_price,
        isLocal: true,
      };

      if (
        !productToAdd.image ||
        !productToAdd.product_name ||
        !productToAdd.slug
      ) {
        console.warn("Incomplete product data for localStorage", productToAdd);
        return;
      }

      // Update localStorage (for both logged-in and non-logged-in users)
      const existingProducts = JSON.parse(
        localStorage.getItem("recentlyViewed") || "[]"
      );

      // Remove if already exists to avoid duplicates
      const updatedProducts = existingProducts.filter(
        (p) => p.id !== visitedProduct.id
      );

      // Add to beginning of array
      updatedProducts.unshift(productToAdd);

      // Keep only the last 10 viewed products
      const limitedProducts = updatedProducts.slice(0, 4);

      localStorage.setItem("recentlyViewed", JSON.stringify(limitedProducts));
      setLocalVisitedProducts(limitedProducts);

      // If user is logged in, also update the API
      if (user) {
        addToVisited({ product_id: visitedProduct.id, date: new Date() });
      }
    }
  }, [visitedProduct, user, addToVisited]);

  // Merge API data with localStorage data when user logs in
  useEffect(() => {
    if (user) {
      // When user logs in, merge localStorage products with API data
      const apiProducts = data?.data || [];
      const merged = [
        ...apiProducts,
        ...localVisitedProducts
          .filter(
            (localProduct) =>
              !apiProducts.some(
                (apiProduct) => apiProduct.id === localProduct.id
              )
          )
          .map((product) => ({ ...product, hasPrice: false })), // Mark localStorage products without prices
      ];
      setMergedProducts(merged);
    } else {
      // For non-logged-in users, just use localStorage
      setMergedProducts(localVisitedProducts);
    }
  }, [user, data, localVisitedProducts]);

  // Filter out any products that might be missing critical data
  const validProducts = mergedProducts.filter(
    (product) =>
      product.id &&
      (product.image || product.product_image) &&
      (product.product_name || product.name)
  );

  return (
    <section id="visit-history">
      <div className="container-fluid pb-12 w-[89%] mx-auto">
        <div className="py-4 text-center flex sm:justify-between justify-center sm:flex-row flex-col">
          <h2 className="sec-title !text-xl">
            {translations["recently-viewed"] || "Recently Viewed"}
          </h2>
        </div>

        {validProducts.length > 0 ? (
          <div className="products-wpr grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-2 lg:gap-8">
            {validProducts.map((product, i) => (
              <div key={`${product.id}-${i}`}>
                <ProductCard
                  product={{
                    ...product,
                    image: product.image || product.product_image,
                    product_name: product.product_name || product.name,
                    slug: product.slug || product.product_slug,
                    new_price: product.new_price,
                    old_price: product.old_price,
                  }}
                  isSquareImage={siteConfig.isSquareImage}
                  showPrice={!!user && !product.hasPrice} // Show price if user is logged in and product has price data
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-8 text-gray-500">
            {translations["no-recently-viewed"] ||
              "No recently viewed products"}
          </p>
        )}
      </div>
    </section>
  );
};

export default LastVisitedProducts;
