"use client";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getCartTotal,
  getCouponDiscount,
  getOrderFormattedCartItems,
} from "@/lib/checkout";

//components
import CartCard from "@/components/cards/CartCard";
import CustomRadio from "@/components/elements/CustomRadio";
import CouponModal from "@/components/modals/CouponModal";
import ArticleLoader from "@/components/elements/loaders/ArticleLoader";
import RequireAuth from "@/components/hoks/RequireAuth";
import FieldsetInput from "@/components/elements/FieldsetInput";
import { setGlobalLoader } from "@/store/features/commonSlice";

//Icons
import { FiPlus } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { useGetPaymentMethodsQuery } from "@/store/features/api/paymentMethodsAPI";
import { siteConfig } from "@/config/site";
import useOrderPlace from "@/hooks/useOrderPlace";

const Checkout = () => {
  // Dynamic delivery charges
  const { settings, translations } = useSelector((state) => state.common);
  // console.log(settings);
  const deliveryMethods = [
    {
      key: "inside dhaka",
      title: `${translations["inside-dhaka"] || "Inside Dhaka"}`,
      charges: settings?.inside_dhaka_delivery_charges,
    },
    {
      key: "outside dhaka",
      title: `${translations["outside-dhaka"] || "Outside Dhaka"}`,
      charges: settings?.outside_dhaka_delivery_charges,
    },
  ];

  const [selectedPayMethod, setSelectedPayMethod] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState(deliveryMethods[0]);
  const [orderCollapsed, setOrderCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { cart, discountCoupon } = useSelector((state) => state.cart);
  const { user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { handleOrderPlace } = useOrderPlace(); //custom hook for separating order place business logics
  const { data: paymentMethodsData } = useGetPaymentMethodsQuery();
  const paymentMethods = paymentMethodsData?.data || {};

  //slicing cart items based on orderCollapsed
  const cartItems = orderCollapsed ? cart : cart.slice(0, 3);

  const handleSelectedPayMethodChange = (payMethod) => {
    setSelectedPayMethod(payMethod);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset();
  }, [user, reset]);

  //Summary calculation
  // const total = getMultipliedColumnTotal(cart, "quantity", "new_price");
  const total = getCartTotal(cart);
  const discountedPrice = getCouponDiscount(discountCoupon, total);
  const totalWithDiscount = total - discountedPrice;

  //Handling free delivery
  const isDeliveryCharge =
    settings?.free_delivery_charges_limit === 0 ||
    settings?.free_delivery_charges_limit > totalWithDiscount;

  // console.log(isDeliveryCharge);

  const handleCheckoutSubmit = async (data, event) => {
    dispatch(setGlobalLoader(true));

    const newOrder = {
      name: data.name,
      alt_name: data.name,
      phone: user?.country_code + user?.phone,
      alt_phone: user?.country_code + user?.alt_phone_no,
      address: data.addressLine + ", " + data.city, // + ", " + data.country,
      alt_address: data.addressLine + ", " + data.city, // + ", " + data.country,
      order_items: getOrderFormattedCartItems(cart),
      payment_type: selectedPayMethod
        ? selectedPayMethod.key
        : Object.values(paymentMethods)[0]?.key,
      delivery_type: isDeliveryCharge ? deliveryMethod.key : "free delivery",
      delivery_charge: isDeliveryCharge ? deliveryMethod.charges : 0,
      coupon: discountCoupon?.code || null,
      coupon_discount: discountedPrice,
      subtotal: total,
      after_discount: totalWithDiscount,
      grand_total: isDeliveryCharge
        ? deliveryMethod.charges + totalWithDiscount
        : totalWithDiscount,
      // note: "",
    };
    // console.log(newOrder);
    handleOrderPlace(newOrder);
  };

  return (
    <section className="container pb-8">
      <div className="breadcrumb breadcrumb-2 py-5">
        <div className="">
          <div>
            <Link
              href={`/`}
              className="text-base text-slate-600 hover:text-secondary"
            >
              {translations["home"] || "Home"}
            </Link>
            <Link
              href={`/checkout`}
              className="text-base text-slate-600 hover:text-secondary"
            >
              {translations["checkout"] || "Checkout"}
            </Link>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 mb-8 gap-14">
        <div className="border border-slate-200">
          <div className="border-b border-slate-200 text-center lg:text-left p-5">
            <h3 className="text-xl">
              {cart.length}{" "}
              {translations["item-in-your-bag"] || "item in your bag"}
            </h3>
          </div>
          <div className="border-b border-slate-200 p-5">
            <div className="">
              {cartItems.map((item, index) =>
                index == 2 && !orderCollapsed ? (
                  <div key={item} className="relative">
                    <CartCard item={item} />
                    <div className="w-full h-full rounded absolute left-0 top-0 flex-center backdrop-blur-sm">
                      <button
                        className="text-btn mt-20 font-bold"
                        onClick={() => setOrderCollapsed(true)}
                      >
                        <FiPlus />
                        {cart.length - 2}
                      </button>
                    </div>
                  </div>
                ) : (
                  <CartCard key={item} item={item} />
                )
              )}
            </div>
          </div>
          <div className="px-5">
            {isDeliveryCharge ? (
              <div className="p-4">
                <h4 className="text-slate-700 font-bold">
                  {translations["delivery-options"] || "Delivery Options"}
                </h4>
                <div className="flex flex-col gap-3 pt-3">
                  {deliveryMethods.map((dm) => (
                    <button
                      key={dm.key}
                      className="flex gap-2 items-center border border-slate-200 p-3"
                      onClick={() => setDeliveryMethod(dm)}
                    >
                      <CustomRadio
                        isChecked={deliveryMethod.key === dm.key}
                        label={dm.title}
                        // onClick={() => setDeliveryMethod(dm)}
                      />
                      <p>{dm.charges}tk</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="text-slate-700 p-4 bg-white my-3">
              <div className="flex-between my-2">
                <p>{translations["total"] || "Total"}</p>
                <p>
                  {siteConfig.currency.shortForm}
                  {total}
                </p>
              </div>
              <div className="flex-between my-2">
                <p>{translations["discount-amount"] || "Discount Amount"}</p>
                <p className="">
                  -{siteConfig.currency.shortForm}
                  {discountedPrice}
                </p>
              </div>
              <div className="flex-between my-2">
                <p>{translations["coupon-discount"] || "Coupon Discount"}</p>
                {discountCoupon ? (
                  <span className="text-primary">{discountCoupon.code}</span>
                ) : (
                  <button
                    className="text-btn underline"
                    onClick={() => setShowModal(true)}
                  >
                    <AiOutlinePlus size={24} />
                  </button>
                )}
              </div>
              <div className="border-b border-slate-300 my-2"></div>
              <div className="flex-between my-2">
                <p>
                  {translations["total-with-discount"] || "Total with discount"}
                </p>
                <p>
                  {siteConfig.currency.shortForm}
                  {totalWithDiscount}
                </p>
              </div>
              {isDeliveryCharge && (
                <div className="flex-between my-2">
                  <p>{translations["delivery-charge"] || "Delivery Charge"}</p>
                  <p>
                    {siteConfig.currency.shortForm}
                    {deliveryMethod.charges}
                  </p>
                </div>
              )}
              <div className="border-b border-slate-900 my-2"></div>
              <div className="flex-between my-2 font-bold">
                <p>{translations["grand-total"] || "Grand Total"}</p>

                <p>
                  {siteConfig.currency.shortForm}
                  {isDeliveryCharge
                    ? deliveryMethod.charges + totalWithDiscount
                    : totalWithDiscount}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
        // className="border border-slate-200"
        >
          <div className=" text-center lg:text-left pb-8">
            <h3 className="text-xl">
              {translations["shipping-address"] || "Shipping Address"}
            </h3>
          </div>
          <div className="border-b border-slate-200">
            <form
              className="w-full"
              onSubmit={handleSubmit(handleCheckoutSubmit)}
            >
              {isLoading ? (
                <ArticleLoader />
              ) : (
                <>
                  <div className="form-control mb-6">
                    <FieldsetInput
                      label={`${translations["name"] || "Name"}`}
                      name="name"
                      defaultValue={user?.name}
                      register={register("name", {
                        required: "Name is required.",
                      })}
                    />
                    {errors.name && (
                      <p className="errorMsg">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="form-control mb-6">
                    <input
                      type="phone"
                      name="phone"
                      defaultValue={user?.country_code + user?.phone}
                      placeholder={
                        translations["phone-number"] || "Phone Number"
                      }
                      {...register("phone", {})}
                      disabled={true}
                      className="cursor-not-allowed bg-slate-100"
                    />
                    {/* {errors.phone && (
                    <p className="errorMsg">{errors.phone.message}</p>
                  )} */}
                  </div>
                  <div className="form-control mb-6">
                    <FieldsetInput
                      label={translations["address"] || "Address"}
                      name="addressLine"
                      defaultValue={user?.address}
                      register={register("addressLine", {
                        required: "Address line is required.",
                      })}
                    />
                    {errors.addressLine && (
                      <p className="errorMsg">{errors.addressLine.message}</p>
                    )}
                  </div>
                  <div className="form-control mb-6">
                    <FieldsetInput
                      label={translations["city"] || "City"}
                      name="city"
                      defaultValue={user?.city}
                      register={register("city", {
                        required: "City is required.",
                      })}
                    />
                    {errors.city && (
                      <p className="errorMsg">{errors.city.message}</p>
                    )}
                  </div>
                  {/* <div className="form-control mb-6">
                    <FieldsetInput
                      label={"Country"}
                      name="country"
                      defaultValue={user.country || "Bangladesh"}
                      register={register("country", {
                        required: "Country is required.",
                      })}
                    />
                    {errors.country && (
                      <p className="errorMsg">{errors.country.message}</p>
                    )}
                  </div> */}
                </>
              )}
              <div className="form-control my-8">
                <div className="border-b-2 border-slate-300 border-dashed"></div>
              </div>
              <div className="form-control">
                <h4 className="text-slate-700 font-bold">
                  {translations["delivery-options"] || "Delivery Options"}
                </h4>
                <div className="flex flex-col gap-3 mt-3">
                  {Object.keys(paymentMethods).map((method, index) =>
                    paymentMethods[method].status === 1 ? (
                      <div
                        key={index}
                        onClick={() =>
                          handleSelectedPayMethodChange(paymentMethods[method])
                        }
                        className="flex items-center justify-between border border-slate-200 p-3"
                      >
                        <CustomRadio
                          isChecked={
                            selectedPayMethod
                              ? paymentMethods[method].key ===
                                selectedPayMethod.key
                              : index === 0
                          }
                          label={paymentMethods[method].title}
                        />
                        <div className="">
                          <Image
                            src={paymentMethods[method].icon}
                            height={32}
                            width={150}
                            alt="icon"
                            className="h-8 w-full"
                          />
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
              <div className="form-control mt-11">
                <button
                  disabled={!cart?.length}
                  type="submit"
                  className="primary-btn w-full disabled:bg-slate-300 disabled:cursor-not-allowed"
									style={{ backgroundColor: settings?.colors?.primary, color: settings?.colors?.primary_text }}
                >
									
                  {translations["order-now"] || "Order Now"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <CouponModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={"Coupon"}
      />
    </section>
  );
};

export default RequireAuth(Checkout);
