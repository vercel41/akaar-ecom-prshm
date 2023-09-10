"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { getCouponDiscount } from "@/utils/checkoutBusinessLogics";
import ThumbSlider from "@/components/elements/sliders/ThumbSlider";
import { getSlicedText } from "@/utils/formatText";
import ViewHTML from "@/components/elements/ViewHTML";
import { addToCart } from "@/store/features/cartSlice";
import ProductVariantSelect from "@/components/products/ProductVariantSelect";
import ActiveLink from "@/components/elements/ActiveLink";
import { Rating } from "react-simple-star-rating";
import { formatLongNumber, getFractionFixed } from "@/utils/formatNumber";
import SocialShare from "@/components/elements/SocialShare";

// ** Import Icon
import { HiChatBubbleLeftRight, HiOutlineShoppingCart } from "react-icons/hi2";
import { TbTag } from "react-icons/tb";
import { IoCall, IoCopy } from "react-icons/io5";

const ProductDetails = ({ children, product, tabItems, settings }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAddToCart = () => {
    if (product?.productVariants?.length) {
      const variantProduct = {
        ...product,
        variantId: selectedVariant?.id,
        selectedVariant,
        // sizes: colors[selectedColor],
      };
      // console.log(variantProduct);
      dispatch(addToCart(variantProduct));
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <>
      <div className="relative product-details">
        <div className="flex gap-10">
          <div className="w-1/2">
            <div className="sticky top-4">
              <ThumbSlider product={product} />
              <div className="py-4">
                <div className="product-actions my-6 flex gap-4 justify-between items-center">
                  <button
                    className="bg-secondary-700 py-3 w-full px-6 text-white rounded-lg text-center active:scale-95"
                    onClick={handleAddToCart}
                  >
                    <HiOutlineShoppingCart size={24} />
                    <span className="ml-2">কার্টে রাখুন</span>
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="bg-primary py-3 w-full px-6 text-white rounded-lg text-center active:scale-95"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M7.91634 1.66667H15.4163L10.833 7.50001H17.083L7.08301 18.3333L9.16634 10.4167H3.33301L7.91634 1.66667Z"
                        fill="white"
                        stroke="white"
                        stroke-linejoin="round"
                      />
                    </svg>{" "}
                    <span className="mr-2">এখনই কিনুন</span>
                  </button>
                </div>
                <div className="border-t border-slate-200 rounded-lg flex justify-between items-center flex-wrap py-4 font-bold">
                  <p className="text-slate-900">বিস্তারিত জানতে কল করুন</p>
                  <p className="text-primary">
                    <IoCall /> {settings?.phone}
                  </p>
                  <p className="text-slate-500">অথবা</p>
                  <p className="text-primary">
                    <IoCall /> {settings?.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="product-content-wrap">
              <p className="text-sm font-bold text-primary capitalize mb-2">
                {product?.brand?.brand_name || "No Brand"}
              </p>
              <h5 className="text-2xl font-bold font-title text-slate-900">
                {getSlicedText(product?.product_name, 100)}
              </h5>
              <div className="meta-data flex items-center gap-8 my-2">
                <div className="flex gap-1 items-center">
                  <Rating
                    initialValue={product?.averate_rating || 5}
                    allowFraction
                    readonly
                    size={24}
                    fillColor="#F59E0B"
                  />
                  <span>{getFractionFixed(product?.averate_rating || 5)}</span>
                </div>
                <p>{formatLongNumber(product?.total_rating)} রেটিং</p>
                <p>
                  <HiChatBubbleLeftRight
                    size={20}
                    className="text-secondary-700"
                  />{" "}
                  {formatLongNumber(product?.toptal_question_answer || 0)}{" "}
                  প্রশ্ন এবং উত্তর
                </p>
                <SocialShare />
              </div>
              {/* short description  */}
              <ViewHTML
                htmlText={product?.product_short_description}
                className={"desc text-base text-slate-600"}
              />
              <div className="product-price flex items-center gap-4 border-b border-slate-200 py-5">
                <span className="text-3xl/[48px] font-bold font-title text-slate-900">
                  ৳ {product?.new_price || "0.00"}{" "}
                </span>
                {product?.discount_percentage > 0 ? (
                  <>
                    <del className="old-price text-lg/[24px] font-normal text-slate-400">
                      ৳{" "}
                      {product?.old_price ? `$ ${product?.old_price}` : "0.00"}
                    </del>
                    <span className="discount inline-block text-base font-semibold font-title text-white bg-red-500 rounded-md py-1 px-2">
                      - {getFractionFixed(product?.discount_percentage)}%
                    </span>
                  </>
                ) : null}
              </div>
              {product?.productVariants?.length ? (
                <ProductVariantSelect
                  productVariants={product?.productVariants}
                  selectedVariant={selectedVariant}
                  setSelectedVariant={setSelectedVariant}
                  sizeChart={product?.size_chart}
                />
              ) : null}

              {product?.coupons.length ? (
                <div className="mt-5 mb-8">
                  <p className="font-semibold font-title text-slate-900 mb-2">
                    সেরা অফার <TbTag size={24} className="text-primary mb-1" />
                  </p>
                  <ul className="coupon-info">
                    <li className="relative text-slate-900 pl-4">
                      কুপন ডিসকাউন্ট:{" "}
                      <span className="font-semibold text-title text-secondary-700">
                        &#2547;
                        {getCouponDiscount(
                          product?.coupons[0],
                          product.new_price
                        )}{" "}
                        ছাড়!
                      </span>
                    </li>
                    <li className="relative text-slate-900 pl-4 my-2 before:!top-3">
                      কুপন কোড:{" "}
                      <span className="inline-block text-primary border border-dashed border-primary rounded px-2 py-1 ml-1">
                        {product.coupons[0].code}{" "}
                        <CopyToClipboard
                          text={product.coupons[0].code}
                          // onCopy={() => alert("copied")}
                        >
                          <IoCopy
                            size={20}
                            className="text-primary mb-1 active:scale-90"
                          />
                        </CopyToClipboard>
                      </span>
                    </li>
                    <li className="relative text-slate-900 pl-4 mb-3">
                      প্রযোজ্য: ৳{product.coupons[0].max_discount} উপরে অর্ডারে
                      (শুধুমাত্র প্রথম কেনাকাটায়)
                    </li>
                  </ul>
                  <Link href="#" className="text-secondary-700 underline">
                    অফারের সকল প্রডাক্ট দেখুন
                  </Link>
                </div>
              ) : null}
              <div className="delivery flex flex-wrap gap-y-7 bg-slate-50 border border-slate-200 rounded-lg py-4">
                <div className="single-info">
                  <Image
                    src={`/assets/images/icons/inside.png`}
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full"
                  />
                  <div>
                    <p className="text-slate-600">ডেলিভারি খরচ:</p>
                    <p className="text-slate-600">
                      ঢাকার ভিতরে - {settings?.inside_dhaka_delivery_charges}{" "}
                      টাকা
                    </p>
                  </div>
                </div>
                <div className="single-info border-l border-slate-200">
                  <Image
                    src={`/assets/images/icons/outside.png`}
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full"
                  />
                  <div>
                    <p className="text-slate-600">ডেলিভারি খরচ:</p>
                    <p className="text-slate-600">
                      ঢাকার বাইরে - {settings?.outside_dhaka_delivery_charges}{" "}
                      টাকা
                    </p>
                  </div>
                </div>
                <div className="single-info">
                  <Image
                    src={`/assets/images/icons/COD.png`}
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full"
                  />
                  <div>
                    <p className="text-slate-600">
                      সারাদেশ এ ক্যাশ অন ডেলিভারি
                    </p>
                  </div>
                </div>
                <div className="single-info border-l border-slate-200">
                  <Image
                    src={`/assets/images/icons/paymnt.png`}
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full"
                  />
                  <div>
                    <p className="text-slate-600">
                      নিরাপদ পেমেন্ট করার সহজ মাধ্যম
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* tabs-view previous position */}
            <div className="tabs-view">
              {/* tabs view */}
              <ul className="sticky top-0 bg-white z-20 product-tab-links flex justify-between items-center border-b border-slate-200 py-5 mt-5">
                {tabItems.map((item) => (
                  <li key={item.id}>
                    <ActiveLink href={item.path}>{item.title}</ActiveLink>
                  </li>
                ))}
              </ul>
              {/* tabs content  */}
              <div className="product-tab-content pt-8 pb-4 border-b-4 border-slate-200">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
