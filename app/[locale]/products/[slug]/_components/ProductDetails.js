"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { getCouponDiscount } from "@/lib/checkout";
import { getSlicedText } from "@/utils/format-text";
import ViewHTML from "@/components/elements/ViewHTML";
import ProductVariantSelect from "@/components/products/ProductVariantSelect";
import * as pixel from "/lib/fpixel";

// ** Import Icon
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { TbTag } from "react-icons/tb";
import { IoCopy } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import ProductViewSlider from "./ProductViewSlider";
import { siteConfig } from "@/config/site";
import { IoIosFlash } from "react-icons/io";
import { getDiscountPercent } from "@/utils/percent";
import useCart from "@/hooks/useCart";
import { useSelector } from "react-redux";
import VideoPlayer from "@/components/elements/VideoPlayer";
import { MdArrowForwardIos } from "react-icons/md";
import SizeChartModal from "@/components/modals/SizeChartModal";
import { getFirstVariantOfColor } from "@/lib/product-variant";
import SocialShare from "@/components/elements/SocialShare";

const ProductDetails = ({ product, settings, translations, isLoading }) => {
  // console.log(product)
  const { handleAddToCart, handleAddAndCheckout } = useCart(); //custom hook for reusing
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const productViewSwiperRef = useRef(null);
  const targetRef = useRef(null);

  //used this to get first variant of selected color to display first variant prices
  // const firstVariantOfColor = null;
  const firstVariantOfColor = getFirstVariantOfColor(
    selectedColor,
    product?.barcodes
  );

  const newPrice =
    selectedVariant?.discount_selling_price ||
    firstVariantOfColor?.discount_selling_price ||
    product?.new_price;
  const oldPrice =
    selectedVariant?.selling_price ||
    firstVariantOfColor?.selling_price ||
    product?.old_price;

  const { isFbPixelInitialized } = useSelector((state) => state.common);
  const flag = useRef(true);

  // //Facebook Pixel view content event
  useEffect(() => {
    // Check if product ID exists to avoid errors
    if (product && isFbPixelInitialized && flag.current) {
      pixel.event("ViewContent", pixel.getProductPixelData(product));
      flag.current = false;
    }
  }, [product, isFbPixelInitialized]);

  return (
    <>
      <div ref={targetRef} className="relative product-details">
        <div className="grid mx-auto md:grid-cols-2 lg:gap-10 md:w-9/12">
          <div className="lg:w-fit">
            <div className="sticky top-32">
              <ProductViewSlider
                product={product}
                ref={productViewSwiperRef}
                selectedColor={selectedColor}
                isSquareImage={siteConfig.isSquareImage}
                isLoading={isLoading}
                targetRef={targetRef}
              />
            </div>
          </div>

          <div className="w-full md:max-w-[540px] mx-auto md:ml-5 ">
            <div className="sticky top-[80px]">
              <div className="product-content-wrap">
                <h5 className="font-medium text-black font-noto_serif">
                  {product?.brand?.brand_name
                    ? `${product?.brand?.brand_name} | `
                    : ""}{" "}
                  {getSlicedText(product?.product_name, 100)}
                </h5>

                <div className="flex items-center gap-1 font-noto_serif text-[.8rem] pt-2 text-gray-500 font-medium">
                  <span>Code:</span>
                  <span>{product?.sku}</span>
                </div>

                <div className="gap-2 items-center py-3 product-price font-noto_serif lg:py-5">
                  <span className="font-semibold">
                    {siteConfig.currency.sign}{" "}
                    {newPrice.toLocaleString("en-US", {
                      currency: "USD",
                    }) || "0.00"}{" "}
                  </span>
                  {oldPrice > newPrice ? (
                    <div className="hidden md:flex items-center gap-2 text-[.9rem]">
                      <del className="font-normal old-price text-slate-400">
                        {siteConfig.currency.sign}{" "}
                        {oldPrice.toLocaleString("en-US", {
                          currency: "USD",
                        })
                          ? oldPrice.toLocaleString("en-US", {
                              currency: "USD",
                            })
                          : "0.00"}
                      </del>
                      <span className="discount-badge rounded text-[#ff0000] font-medium ">
                        {getDiscountPercent(oldPrice, newPrice).toLocaleString(
                          "en-US",
                          {
                            currency: "USD",
                          }
                        )}
                        % OFF
                      </span>
                    </div>
                  ) : null}
                </div>

                <hr className="h-[2px] bg-black" />

                {/* short description  */}
                <ViewHTML
                  htmlText={product?.product_short_description}
                  className={"tracking-normal desc"}
                />

                <hr className="h-[2px] bg-black" />

                <div className="px-3 lg:px-0">
                  {!(
                    product.barcodes?.length === 1 &&
                    product.barcodes[0].size === "" &&
                    product.barcodes[0].color === ""
                  ) ? (
                    <ProductVariantSelect
                      photos={product?.photos}
                      productBarCodes={product?.barcodes}
                      selectedVariant={selectedVariant}
                      setSelectedVariant={setSelectedVariant}
                      translations={translations}
                      ref={productViewSwiperRef}
                      setSelectedColor={setSelectedColor}
                      selectedColor={selectedColor}
                      size_cart={product?.size_chart}
                    />
                  ) : null}
                </div>
                {product?.coupons?.length ? (
                  <div className="mt-5 mb-8">
                    <p className="mb-2 font-semibold font-noto_serif text-slate-900">
                      {translations["best-offer"] || "সেরা অফার"}{" "}
                      <TbTag size={24} className="mb-1 text-primary" />
                    </p>
                    <ul className="coupon-info">
                      <li className="relative pl-4 text-slate-900">
                        {translations["coupon-discount"] || "কুপন ডিসকাউন্ট"}:{" "}
                        <span className="font-semibold text-title text-secondary-700">
                          &#2547;
                          {product?.new_price
                            ? getCouponDiscount(
                                product?.coupons[0],
                                product.new_price.toLocaleString("en-US", {
                                  currency: "USD",
                                })
                              )
                            : 0}{" "}
                          {translations["off!"] || "ছাড়!"}
                        </span>
                      </li>
                      <li className="relative text-slate-900 pl-4 my-2 before:!top-3">
                        {translations["coupon-code"] || "কুপন কোড"}:{" "}
                        <span className="inline-block px-2 py-1 ml-1 rounded border border-dashed text-primary border-primary">
                          {product.coupons[0].code}{" "}
                          <CopyToClipboard
                            text={product.coupons[0].code}
                            onCopy={() => toast.success("copied")}
                          >
                            <IoCopy
                              size={20}
                              className="mb-1 text-primary active:scale-90"
                            />
                          </CopyToClipboard>
                        </span>
                      </li>
                      <li className="relative pl-4 mb-3 text-slate-900">
                        {translations["applicable"] || "প্রযোজ্য"}:{" "}
                        {siteConfig.currency.sign}
                        {product.coupons[0].max_discount}{" "}
                        {translations["amount-above-order"] ||
                          "উপরে অর্ডারে (শুধুমাত্র প্রথম কেনাকাটায়)"}
                      </li>
                    </ul>
                    <Link href="#" className="underline text-secondary-700">
                      {translations["see-all-products-on-offer"] ||
                        "অফারের সকল প্রডাক্ট দেখুন"}
                    </Link>
                  </div>
                ) : null}
              </div>
              {/* size chart section */}

              {/* Add to cart section  */}
              {product.stock_qty > 0 ? (
                <div className="py-2 pt-6 lg:pt-8 lg:pb-4 w-[calc(100%-100px)] mx-auto">
                  <div className="flex flex-col gap-4 justify-between items-center product-actions">
                    <button
                      className=" py-2 px-2.5 w-full text-white text-[.8rem] text-center active:scale-95 font-semibold uppercase btn btn-secondary"
                      onClick={() => handleAddToCart(product, selectedVariant)}
                      style={{
                        "--btn-bg-color": settings?.colors?.primary,
                        "--btn-text-color": settings?.colors?.primary_text,
                      }}
                    >
                      {/* <HiOutlineShoppingCart size={24} /> */}
                      <span>
                        {translations["add-to-cart"] || "Add to cart"}
                      </span>
                    </button>
                    <button
                      onClick={() =>
                        handleAddAndCheckout(product, selectedVariant)
                      }
                      className="py-2 px-2.5 w-full text-[.8rem] text-center active:scale-95 uppercase btn btn-primary hover:text-white"
                      style={{
                        "--btn-bg-color": settings?.colors?.primary,
                        "--btn-text-color": settings?.colors?.secondary_text,
                      }}
                    >
                      {/* <IoIosFlash size={24} />{" "} */}
                      <span>{translations["buy-now"] || "Buy now"}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <p
                  className={`my-5 text-base font-bold text-center text-red-500`}
                >
                  Out of stock
                </p>
              )}

              {/* product details section  */}

              <div>
                <div className="mt-5  lg:mt-5">
                  {/* Product Descriptions */}
                  <div className="gap-10 pt-3 pb-2 lg:pt-4 lg:pb-4 lg:gap-28 lg:gap-y-14">
                    <div>
                      {/* short description  */}
                      {/* {product?.product_short_description && (
                <ViewHTML
                  htmlText={product?.product_short_description}
                  className={"desc"}
                />
              )} */}

                      <div>
                        {product?.details && (
                          <div className="description">
                            <h4 className="text-xl font-bold font-noto_serif text-slate-900">
                              {translations["product-description"] ||
                                "Description"}
                              :
                            </h4>
                            <ViewHTML
                              htmlText={product?.details}
                              className={"tracking-normal"}
                            />
                          </div>
                        )}
                      </div>

                      {/* product-specifications */}
                      {product?.specification && (
                        <div
                          id="product-specifications"
                          className="mt-4 lg:mt-5"
                        >
                          <h4 className="text-xl font-bold font-noto_serif text-slate-900">
                            {translations["specifications"] || "Specifications"}
                            :
                          </h4>
                          <div className="overflow-x-auto px-4 -mx-4 mt-3 sm:-mx-8 sm:px-8">
                            <ViewHTML
                              className={"tracking-normal text-justify"}
                              htmlText={product?.specification}
                            />
                          </div>
                        </div>
                      )}

                      {product.includedProducts?.length ? (
                        <div className="mt-4 lg:mt-5">
                          <h4 className="mb-4 text-xl font-bold capitalize font-noto_serif text-slate-900">
                            {translations["product-included"] ||
                              "Product Included"}
                            :
                          </h4>
                          <Image
                            src={product.includedProducts[0]?.image}
                            alt="Insta 360"
                            width={628}
                            height={510}
                            className="w-full h-[300px] lg:h-[510px] rounded-lg object-cover"
                          />
                        </div>
                      ) : null}

                      {product?.review_video && (
                        <div className="mt-4 lg:mt-5">
                          <h4 className="text-xl font-bold font-noto_serif text-slate-900">
                            {translations["review-video"] || "রিভিউ ভিডিও"}
                          </h4>
                          <div className="mt-3">
                            <VideoPlayer
                              url={product?.review_video}
                              loop={true}
                              muted={true}
                              // playing={true}
                              controls={true}
                              className={"h-[12rem] md:h-[21.875rem]"}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {settings?.phone[0] && (
                    <div className="p-4 mt-5 mb-4 w-full text-center bg-amber-200 border contact">
                      <h5 className="mb-3 text-xl font-bold font-noto_serif text-slate-900">
                        {translations["call-now"] || "Call Now"}
                      </h5>
                      <p className="flex gap-4 justify-center items-center">
                        {/* <span className="text-base text-slate-900">
                {translations["call-now"] || "Call Now"}:
              </span>{" "} */}
                        <Link
                          href={`tel:${settings?.phone[0]}`}
                          className="text-xl font-bold font-noto_serif text-primary"
                        >
                          <BsFillTelephoneFill /> {settings?.phone[0]}
                        </Link>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <SocialShare translations={translations} />
            </div>
          </div>
        </div>

        {/* product details and description */}
      </div>
    </>
  );
};

export default ProductDetails;
