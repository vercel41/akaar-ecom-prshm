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

// ** Import Icon
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { TbTag } from "react-icons/tb";
import { IoCall, IoCopy } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";

const ProductDetails = ({ product, settings }) => {
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
            </div>
          </div>
          <div className="w-1/2">
            <div className="product-content-wrap">
              <p className="text-sm font-bold text-primary capitalize mb-2">
                {product?.brand?.brand_name || "No Brand"}
              </p>
              <h5 className="text-2xl font-title text-slate-900">
                {getSlicedText(product?.product_name, 100)}
              </h5>
              <div className="product-price flex items-center gap-4 py-4">
                <span className="text-xl font-title text-slate-900">
                  tk. {product?.new_price || "0.00"}{" "}
                </span>
                {product?.discount_percentage > 0 ? (
                  <>
                    <del className="old-price text-lg/[24px] font-normal text-slate-400">
                      {product?.old_price ? `${product?.old_price}` : "0.00"}
                    </del>
                  </>
                ) : null}
              </div>
              {/* Rating Review and Share section  */}
              {/* <div className="meta-data flex items-center gap-8 my-2">
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
              </div> */}
              {/* short description  */}
              <ViewHTML
                htmlText={product?.product_short_description}
                className={"desc"}
              />
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
                    Offer <TbTag size={24} className="text-primary mb-1" />
                  </p>
                  <ul className="coupon-info">
                    <li className="relative text-slate-900 pl-4">
                      Coupon Discount:{" "}
                      <span className="font-semibold text-title text-secondary-700">
                        &#2547;
                        {getCouponDiscount(
                          product?.coupons[0],
                          product.new_price
                        )}{" "}
                        Discount!
                      </span>
                    </li>
                    <li className="relative text-slate-900 pl-4 my-2 before:!top-3">
                      Coupon Code:{" "}
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
                      Applicable: ৳{product.coupons[0].max_discount} Above
                      orders (Only first purchase)
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>

            {/* Add to cart section  */}
            <div className="py-4">
              <div className="product-actions my-6 flex gap-4 justify-between items-center">
                <button
                  className="bg-primary py-3 w-full px-6 text-white  text-center active:scale-95"
                  onClick={handleAddToCart}
                >
                  <HiOutlineShoppingCart size={24} />
                  <span className="ml-2">Add to Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="bg-primary py-3 w-full px-6 text-white  text-center active:scale-95"
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
                  <span className="mr-2">Buy Now</span>
                </button>
              </div>
            </div>

            {/* Product Descriptions */}
            <div className="pt-8 pb-4">
              <div className="description">
                <h4 className="text-2xl font-bold font-title text-slate-900">
                  Description:
                </h4>
                <ViewHTML htmlText={product?.details} />
              </div>
              <div className="mt-8">
                <h4 className="text-2xl font-bold font-title text-slate-900 mb-4">
                  Product Included
                </h4>
                <Image
                  src={
                    product?.product_includes ||
                    `/assets/images/shop/accessories.jpg`
                  }
                  alt="Insta 360"
                  width={628}
                  height={510}
                  className="w-full h-[510px]"
                />
              </div>

              {product?.review_video && (
                <div className="mt-8">
                  <h4 className="text-2xl font-bold font-title text-slate-900">
                    Review Video
                  </h4>
                  {/* [&>div>iframe]:rounded-xl relative */}
                  <div className="slider-imag mt-4">
                    <ViewHTML htmlText={product?.review_video} />
                  </div>
                </div>
              )}

              <div className="contact mt-8 bg-amber-200  border p-4 mb-4 text-center">
                <h5 className="text-2xl font-bold font-title text-slate-900 mb-3">
                  Contact for more details
                </h5>
                <p className="flex justify-center items-center gap-4">
                  <span className="text-base text-slate-900">Call Now:</span>{" "}
                  <Link
                    href={`tel:${settings?.phone}`}
                    className="text-2xl font-bold font-title text-primary"
                  >
                    <BsFillTelephoneFill /> {settings?.phone}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
