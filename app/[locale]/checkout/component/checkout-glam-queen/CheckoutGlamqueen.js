/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAutoSelectedPaymentOption,
  getCartTotal,
  getCouponDiscount,
  getDefaultFormValues,
  getOrderFormattedCartItems,
} from "@/lib/checkout";

//components
import CartCard from "@/components/cards/CartCard";
import CustomRadio from "@/components/elements/CustomRadio";
import CouponModal from "@/components/modals/CouponModal";
import RequireAuth from "@/components/hoks/RequireAuth";
import * as pixel from "/lib/fpixel";

//Icons
import { FiPlus } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { useGetPaymentMethodsQuery } from "@/store/api/paymentMethodsAPI";
import { siteConfig } from "@/config/site";
import useOrderPlace from "@/hooks/useOrderPlace";
import useProfileUpdate from "@/hooks/useProfileUpdate";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { toast } from "react-toastify";
import { getGTMFormattedCartItems } from "@/lib/gtm-data-formatter";
import { useAddToTrackingMutation } from "@/store/api/serverSideTrackingAPI";
import { generateUniqueId } from "@/utils/get-unique";
import { Cookies } from "@/utils/cookies";
import { sendGTMEvent } from "@next/third-parties/google";
import {
  usePlaceAnOrderMutation,
  usePlaceIncompleteOrderMutation,
} from "@/store/api/orderAPI";
import FieldsetInput from "@/components/elements/FieldsetInput";
import ShippingFormWithOutAreaSelect from "../checkout-without-area-select/ShippingFormWithOutAreaSelect";
import { useRouter } from "next/navigation";
import { setGlobalLoader } from "@/store/slices/commonSlice";
import { clearCart, clearDiscountInfo } from "@/store/slices/cartSlice";

const CheckoutGlamqueen = () => {
  // Dynamic delivery charges
  const { settings, translations, isFbPixelInitialized } = useSelector(
    (state) => state.common
  );
  // console.log(settings);
  const deliveryAreas = [
    {
      key: `inside dhaka`,
      title: `Inside ${settings?.delivery_region || "Dhaka"}`,
      charges: settings?.inside_dhaka_delivery_charges,
    },
    // {
    // 	key: "sub dhaka",
    // 	title: `Sub ${settings?.delivery_region || "Dhaka"}`,
    // 	charges: settings?.sub_dhaka_delivery_charges,
    // },
    {
      key: "outside dhaka",
      title: `Outside ${settings?.delivery_region || "Dhaka"}`,
      charges: settings?.outside_dhaka_delivery_charges,
    },
  ];

  // --------------------DEFAULT DELIVERY AREA STATE----------------------
  const [deliveryArea, setDeliveryArea] = useState(deliveryAreas[1]);

  const [isDeliveryChargeRequired, setIsDeliveryChargeRequired] =
    useState(false);
  const [activePaymentMethods, setActivePaymentMethods] = useState(null);
  const [selectedPayMethod, setSelectedPayMethod] = useState(null);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);
  const [orderCollapsed, setOrderCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isTermChecked, setIsTermChecked] = useState(false);
  const { cart, discountCoupon } = useSelector((state) => state.cart);
  const { user, isLoading } = useSelector((state) => state.auth);
  const [placeAnOrder] = usePlaceAnOrderMutation();
  const isGuestCheckout = !!settings?.guest_checkout;
  const dispatch = useDispatch();
  const router = useRouter();
  const { handleUserUpdate } = useProfileUpdate(); //custom hook for separating profile update business logics
  const isMobile = useMediaQuery("(max-width: 768px)"); // checking for mobile

  const { data: paymentMethodsData } = useGetPaymentMethodsQuery();
  const [placeIncompleteOrder] = usePlaceIncompleteOrderMutation();
  const paymentMethods = useMemo(
    () => paymentMethodsData?.data || {},
    [paymentMethodsData]
  );

  //slicing cart items based on orderCollapsed
  const cartItems = orderCollapsed ? cart : cart.slice(0, 3);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: getDefaultFormValues(),
  });

  //------------------ WATCH VALUES ------------------
  const phoneValue = watch("phone");
  const nameValue = watch("name");
  const addressValue = watch("address");
  useEffect(() => {
    reset();
  }, [user, reset]);

  //Summary calculation
  // const total = getMultipliedColumnTotal(cart, "quantity", "new_price");
  const total = getCartTotal(cart);
  const discountedPrice = getCouponDiscount(discountCoupon, total);
  const totalWithDiscount = total - discountedPrice;

  //Handling free delivery charge
  const deliveryCharge =
    settings?.free_delivery_charges_limit > totalWithDiscount ||
    settings?.free_delivery_charges_limit <= 0
      ? deliveryArea?.charges || 0
      : 0;

  const grandTotal = totalWithDiscount + deliveryCharge;

  //Handling delivery area and delivery charge Required
  const handleDeliveryAreaChange = (area) => {
    setDeliveryArea(area);
    setSelectedPaymentOption(null);
    updateDeliveryChargeRequirement(area?.key);

    //auto select payment option
    const autoSelectedPaymentOption =
      getAutoSelectedPaymentOption(activePaymentMethods);
    if (autoSelectedPaymentOption)
      setSelectedPaymentOption(autoSelectedPaymentOption);
  };
  //auto select payment method
  useEffect(() => {
    if (Object.keys(paymentMethods).length > 0) {
      let activePayments = Object.values(paymentMethods).filter(
        (payMethod) => payMethod?.status === 1
      );

      if (activePayments?.length > 1 && activePayments[0].key === "COD") {
        setSelectedPayMethod(activePayments[1]);
      } else {
        setSelectedPayMethod(activePayments[0]);
      }
      setActivePaymentMethods(activePayments);
    }
  }, [paymentMethods]);

  const isCodPayEnabled =
    activePaymentMethods?.length > 0 &&
    activePaymentMethods?.find((payMethod) => payMethod?.key === "COD")
      ?.status === 1;

  const paymentOptions = [
    isCodPayEnabled &&
    (!isDeliveryChargeRequired || activePaymentMethods?.length == 1)
      ? {
          key: "no_payment",
          title: `Cash on delivery`,
          value: grandTotal,
        }
      : null,
    activePaymentMethods?.length > 1 &&
    isDeliveryChargeRequired &&
    isCodPayEnabled
      ? {
          key: "delivery_charge_payment",
          title: `Pay delivery charge only`,
          value: deliveryArea.charges,
        }
      : null,
    (activePaymentMethods?.length === 1 &&
      activePaymentMethods[0].key === "COD") ||
    activePaymentMethods?.length === 0
      ? null
      : {
          key: "total_payment",
          title: `Pay total amount`,
          value: grandTotal,
        },
  ].filter((option) => option !== null);

  // Auto select payment option
  useEffect(() => {
    const autoSelectedPaymentOption =
      getAutoSelectedPaymentOption(activePaymentMethods);
    if (autoSelectedPaymentOption)
      setSelectedPaymentOption(autoSelectedPaymentOption);
  }, [activePaymentMethods]);

  useEffect(() => {
    let incompleteId = localStorage.getItem("incomplete_unique_id");
    if (!incompleteId) {
      const newId = generateUniqueId();
      localStorage.setItem("incomplete_unique_id", newId);
    }
  }, []);

  const isDisabled = !!(!cart?.length || settings?.agreement_links?.length
    ? !isTermChecked
    : false);

  // ------------------ CHECKOUT SUBMIT ------------------
  const handleCheckoutSubmit = async (data) => {
    const incompleteId = localStorage.getItem("incomplete_unique_id");
    if (!deliveryArea) {
      document.getElementById("deliveryAreaError").classList.remove("hidden");
      toast.error("Please select delivery area");
      return;
    }

    if (activePaymentMethods?.length === 0) {
      toast.error(
        "Checkout is not available now, please contact us for more info"
      );
      return;
    }
    if (!selectedPaymentOption) {
      document.getElementById("paymentOptionError").classList.remove("hidden");
      toast.error("Please select payment option");
      return;
    }

    let phone = data?.phone;
    let alt_phone = data?.phone;
    let fullAddress = data.address;

    //for authorized u
    if (!settings?.guest_checkout) {
      alt_phone =
        siteConfig.phone.countryCode + user?.phone || user?.alt_phone_no;
    }
    const newOrder = {
      name: data.name,
      alt_name: data.name,
      phone: phone,
      alt_phone: alt_phone,
      address: fullAddress,
      alt_address: fullAddress,
      order_items: getOrderFormattedCartItems(cart),
      payment_method: selectedPayMethod,
      delivery_type: deliveryCharge ? deliveryArea.key : "free delivery",
      delivery_charge: deliveryCharge,
      coupon: discountCoupon?.code || null,
      coupon_discount: discountedPrice,
      subtotal: total,
      after_discount: totalWithDiscount,
      grand_total: grandTotal,
      paymentOption: selectedPaymentOption,
      note: data.note,
      incomplete_unique_id: incompleteId,
    };
    // console.log("newOrder", newOrder);
    // handleOrderPlace(newOrder);
    if (newOrder.paymentOption !== "no_payment") {
      newOrder.payment_type = "Online"; //forcing to use payment type Online
      delete newOrder.payment_method;
      delete newOrder.paymentOption;
    } else {
      newOrder.payment_type = "COD"; //forcing to use payment type COD
      delete newOrder.payment_method;
    }
    console.log("newOrder", newOrder);
    placeAnOrder({ newOrder, isGuestCheckout })
      .unwrap()
      .then((response) => {
        dispatch(clearDiscountInfo());
        dispatch(setGlobalLoader(false));
        toast.success("Order successful");
        const { sale } = response || {};
        dispatch(clearCart());
        router.push(`checkout/success/${sale?.id}`);
      })
      .catch((error) => {
        // Handle the error if necessary
        dispatch(setGlobalLoader(false));
        console.log(error);
        toast.error(
          error.data?.message ||
            "Failed to place an order, something went wrong, please try again"
        );
      });

    // ------------------ LOCAL STORAGE CLEAR AFTER ORDER PLACE ------------------
    localStorage.removeItem("name");
    localStorage.removeItem("address");
    localStorage.removeItem("phone");
    localStorage.removeItem("incomplete_unique_id");
    // updating user for the first time only not applicable for guest checkout
    if (
      ((!user?.phone && !user?.alt_phone_no) || !user?.address) &&
      !settings?.guest_checkout
    ) {
      handleUserUpdate({
        ...user,
        alt_phone_no: user?.alt_phone_no || data?.phone,
        address: user.address || data?.address,
        // city: data?.city,
      });
    }
    // else alert("user not updated");
  };
  // ------------------ INCOMPLETE ORDER ------------------
  const handleIncompleteOrderSubmit = async (data) => {
    const incompleteId = localStorage.getItem("incomplete_unique_id");
    let phone = data?.phone;
    let alt_phone = data?.phone;
    let fullAddress = data.address;

    //for authorized u
    if (!settings?.guest_checkout) {
      alt_phone =
        siteConfig.phone.countryCode + user?.phone || user?.alt_phone_no;
    }
    const newOrder = {
      name: data.name,
      alt_name: data.name,
      phone: phone,
      alt_phone: alt_phone,
      address: fullAddress,
      alt_address: fullAddress,
      order_items: getOrderFormattedCartItems(cart),
      payment_method: selectedPayMethod,
      delivery_type: deliveryCharge ? deliveryArea.key : "free delivery",
      delivery_charge: deliveryCharge,
      coupon: discountCoupon?.code || null,
      coupon_discount: discountedPrice,
      subtotal: total,
      after_discount: totalWithDiscount,
      grand_total: grandTotal,
      paymentOption: selectedPaymentOption,
      note: data.note,
      incomplete_unique_id: incompleteId,
    };
    console.log("newOrder", newOrder);
    try {
      await placeIncompleteOrder(newOrder);
    } catch (error) {
      console.log(error);
    }
  };

  //  ------------------ THIS USEEFFECT IS FOR INCOMPLETE ORDER ------------------
  useEffect(() => {
    const phonePattern = siteConfig.phone.pattern;
    if (phoneValue && phonePattern.test(phoneValue)) {
      localStorage.setItem("phone", phoneValue);
      localStorage.setItem("name", nameValue);
      localStorage.setItem("address", addressValue);
      const formValues = watch();

      handleIncompleteOrderSubmit(formValues);
    }
  }, [phoneValue, nameValue, addressValue]);

  // Facebook Pixel Initiate Checkout Event
  const [AddToConversionAPI] = useAddToTrackingMutation();
  const flag = useRef(true);
  const flag2 = useRef(true);

  // Facebook Pixel Initiate Checkout Event
  useEffect(() => {
    if (cart.length === 0) return;

    const eventID = generateUniqueId();
    // Check if product ID exists to avoid errors
    if (isFbPixelInitialized && flag.current) {
      pixel.event(
        "InitiateCheckout",
        pixel.getInitiateCheckoutPixelData(cart, total),
        {
          eventID: eventID,
        }
      );
      flag.current = false;
    }

    //For conversion API
    if (settings?.fb_pixel_id && settings?.fb_access_token && flag2.current) {
      AddToConversionAPI({
        event_id: eventID,
        event_name: "InitiateCheckout",
        products: pixel.contentItems(cart),
        fbp: Cookies.get("_fbp"), // Get Facebook Pixel cookie,
        fbc: Cookies.get("_fbc"), // Get Facebook Click ID cookie
      });
      flag2.current = false;
    }
  }, [cart, total, isFbPixelInitialized, settings, AddToConversionAPI]);

  // Google Tag Manager
  const gtmFlag = useRef(true);
  useEffect(() => {
    if (cart.length === 0) return;
    const formattedItems = getGTMFormattedCartItems(cart);
    const payload = {
      event: "begin_checkout",
      ecommerce: {
        currency: "BDT", // Change to your store's currency
        value: total, // Total value of the added item(s)
        fbp: Cookies.get("_fbp"), // Get Facebook Pixel cookie,
        fbc: Cookies.get("_fbc"), // Get Facebook Click ID cookie
        items: formattedItems,
      },
    };

    if (settings?.gtm_id && gtmFlag.current) {
      sendGTMEvent(payload);
      gtmFlag.current = false;
      console.log("gtm begin_checkout occurred");
      // console.log(formattedItems, "formattedItems")
      // console.log(total, "total")
    }
  }, [cart, total, settings]);

  useEffect(() => {
    if (paymentOptions.length === 1) {
      setSelectedPaymentOption(paymentOptions[0].key);
    }
  }, [paymentOptions]);
  console.log(paymentOptions, "paymentOptions");
  return (
    <section className=" pb-8 font-body tracking-normal">
      <div className="py-8 border-y border-gray-300 mb-6">
        <div className="container flex flex-col justify-center items-center gap-2">
          <h2 className="text-xl md:text-2xl text-center uppercase">
            Checkout
          </h2>
          <div className="">
            <div className="container w-fit mx-auto">
              <div>
                <Link
                  href={`/`}
                  className="text-sm text-slate-600 hover:text-secondary capitalize"
                >
                  {translations["home"] || "Home"}
                </Link>
                <span className="text-sm">|</span>
                <Link
                  href={`/checkout`}
                  className="text-sm text-slate-600 hover:text-secondary"
                >
                  {translations["checkout"] || "Checkout"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Shipping Address are for mobile  */}
      {isMobile && (
        <div>
          <ShippingFormWithOutAreaSelect
            handleSubmit={handleSubmit}
            errors={errors}
            register={register}
            isLoading={isLoading}
            handleCheckoutSubmit={handleCheckoutSubmit}
            user={user}
            translations={translations}
            deliveryAreas={deliveryAreas}
            handleDeliveryAreaChange={handleDeliveryAreaChange}
            deliveryArea={deliveryArea}
            deliveryCharge={deliveryCharge}
          />

          {/* Payment Options and Methods for Mobile recently added */}
          {activePaymentMethods?.length !== 0 && (
            <div className="px-6 block md:hidden mb-5">
              {/* Payment Options Area */}
              {deliveryArea ? (
                <div className="form-control">
                  <h4 className="text-slate-700 font-bold">
                    {translations["payment-options"] || "Payment Options"}
                  </h4>
                  <div className="flex flex-col gap-3 pt-3">
                    {paymentOptions.map((payOption) => (
                      <button
                        key={payOption.key}
                        type="button"
                        className="flex gap-2 items-center border border-slate-200 p-3"
                        onClick={() => setSelectedPaymentOption(payOption.key)}
                      >
                        <CustomRadio
                          isChecked={payOption.key === selectedPaymentOption}
                          label={payOption.title}
                          // onClick={() => setDeliveryArea(pt)}
                        />
                        {payOption.key === "no_payment" ? (
                          <></>
                        ) : (
                          <>
                            <p>via Bkash</p>
                            <Image
                              src={
                                "https://software.akaarserver.xyz/images/bkash.png"
                              }
                              height={32}
                              width={80}
                              alt="icon"
                              className="h-8 w-fit max-w-[80px]"
                            />
                          </>
                        )}
                        <p>
                          {siteConfig.currency.sign}
                          {payOption.value}
                        </p>
                      </button>
                    ))}
                  </div>
                  {!selectedPaymentOption && (
                    <p id="paymentOptionError" className="hidden errorMsg">
                      You must select a payment option
                    </p>
                  )}
                </div>
              ) : null}
              {/* Payment Methods Area */}
              {(selectedPaymentOption === "delivery_charge_payment" ||
                selectedPaymentOption === "total_payment") && (
                <div className="bg-[#e1146d] p-2">
                  <div className="flex items-center justify-center bg-white border-b py-2">
                    <Image
                      src="/assets/icons/bkash-logo.svg"
                      alt="Bkash Logo"
                      width={140}
                      height={65}
                    />
                  </div>
                  {/* <div className="flex items-center justify-center bg-white"> */}
                  <div className="flex items-center justify-between bg-white  px-6 py-2">
                    <h2>Glam Queen</h2>

                    {selectedPaymentOption === "delivery_charge_payment" ? (
                      <p>
                        {siteConfig.currency.shortForm}
                        {deliveryCharge}
                      </p>
                    ) : (
                      <p>
                        {siteConfig.currency.shortForm}
                        {grandTotal}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center bg-white px-6 py-2">
                    <p>Personal Number: +8801521103806</p>
                  </div>
                  {/* </div> */}
                  <div className="form-control my-6 ">
                    <FieldsetInput
                      label={translations["note"] || "Trx ID"}
                      name="note"
                      defaultValue={user?.note}
                      register={register("note", {
                        required: "Transaction id is required.",
                      })}
                    />
                    {errors.note && (
                      <div className="errorMsg bg-white text-center">
                        <p className="errorMsg">{errors.note.message}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="grid lg:grid-cols-2 mb-8 gap-14 max-w-7xl mx-auto">
        <div id="checkout-left" className="border border-slate-200 ">
          {/* Cart Items  */}
          <div className="lg:order-1 order-2">
            <div className="border-b border-slate-200 text-left p-3 lg:p-5">
              <h3 className="text-xl">
                {cart.length}{" "}
                {translations["item-in-your-bag"] || "item in your bag"}
              </h3>
            </div>
            <div className=" border-slate-200 p-3 lg:p-5">
              <div className="">
                {cartItems.map((item, index) =>
                  index == 2 && !orderCollapsed ? (
                    <div key={index} className="relative">
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
                    <CartCard key={index} item={item} />
                  )
                )}
              </div>
            </div>
          </div>

          {/* Order Summery  */}
          <div className="lg:order-3 text-slate-700 px-3 lg:px-9 py-4 bg-white my-3">
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
            {deliveryArea && (
              <div className="flex-between my-2">
                <p>
                  {translations["delivery-charge"] || "Delivery Charge"}{" "}
                  {!deliveryCharge && (
                    <span className="bg-green-100 px-2 text-green-500">
                      Free
                    </span>
                  )}
                </p>
                <p>
                  {siteConfig.currency.shortForm}
                  {deliveryCharge}
                </p>
              </div>
            )}
            <div className="border-b border-slate-900 my-2"></div>
            <div className="flex-between my-2 font-bold">
              <p>{translations["grand-total"] || "Grand Total"}</p>

              <p>
                {siteConfig.currency.shortForm}
                {grandTotal}
              </p>
            </div>
          </div>
        </div>
        <div id="checkout-right">
          {/* Shipping Address Area for web*/}
          {!isMobile && (
            <ShippingFormWithOutAreaSelect
              handleSubmit={handleSubmit}
              errors={errors}
              register={register}
              isLoading={isLoading}
              handleCheckoutSubmit={handleCheckoutSubmit}
              user={user}
              translations={translations}
              deliveryAreas={deliveryAreas}
              handleDeliveryAreaChange={handleDeliveryAreaChange}
              deliveryArea={deliveryArea}
              deliveryCharge={deliveryCharge}
            />
          )}
          {/* Payment Area  */}
          {activePaymentMethods?.length !== 0 && (
            <div className="lg:px-6 hidden md:block">
              {/* Payment Options Area */}
              {deliveryArea ? (
                <div className="form-control">
                  <h4 className="text-slate-700 font-bold">
                    {translations["payment-options"] || "Payment Options"}
                  </h4>
                  <div className="flex flex-col gap-3 pt-3">
                    {paymentOptions.map((payOption) => (
                      <button
                        key={payOption.key}
                        type="button"
                        className="flex gap-2 items-center border border-slate-200 p-3"
                        onClick={() => setSelectedPaymentOption(payOption.key)}
                      >
                        <CustomRadio
                          isChecked={payOption.key === selectedPaymentOption}
                          label={payOption.title}
                          // onClick={() => setDeliveryArea(pt)}
                        />
                        {payOption.key === "no_payment" ? (
                          <></>
                        ) : (
                          <>
                            <p>via Bkash</p>
                            <Image
                              src={
                                "https://software.akaarserver.xyz/images/bkash.png"
                              }
                              height={32}
                              width={80}
                              alt="icon"
                              className="h-8 w-fit max-w-[80px]"
                            />
                          </>
                        )}

                        <p>
                          {siteConfig.currency.sign}
                          {payOption.value}
                        </p>
                      </button>
                    ))}
                  </div>
                  {!selectedPaymentOption && (
                    <p id="paymentOptionError" className="hidden errorMsg">
                      You must select a payment option
                    </p>
                  )}
                </div>
              ) : null}
              {/* Payment Methods Area */}
              {(selectedPaymentOption === "delivery_charge_payment" ||
                selectedPaymentOption === "total_payment") && (
                <div className="bg-[#e1146d] p-2 mt-3">
                  <div className="flex items-center justify-center bg-white border-b py-2">
                    <Image
                      src="/assets/icons/bkash-logo.svg"
                      alt="Bkash Logo"
                      width={140}
                      height={65}
                    />
                  </div>
                  {/* <div className="flex items-center justify-center bg-white"> */}
                  <div className="flex items-center justify-between bg-white  px-6 py-2">
                    <h2>Glam Queen</h2>

                    {selectedPaymentOption === "delivery_charge_payment" ? (
                      <p>
                        {siteConfig.currency.shortForm}
                        {deliveryCharge}
                      </p>
                    ) : (
                      <p>
                        {siteConfig.currency.shortForm}
                        {grandTotal}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center bg-white px-6 py-2">
                    <p>Personal Number: +8801521103806</p>
                  </div>
                  {/* </div> */}
                  <div className="form-control my-6 ">
                    <FieldsetInput
                      label={translations["note"] || "Trx ID"}
                      name="note"
                      defaultValue={user?.note}
                      register={register("note", {
                        required: "Transaction id is required.",
                      })}
                    />
                    {errors.note && (
                      <div className="errorMsg bg-white text-center">
                        <p className="errorMsg">{errors.note.message}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Order Now Button  */}
          <div className="form-control mt-7   lg:px-6">
            {settings?.terms_and_condition_link &&
            settings?.terms_and_condition_link !== "#" ? (
              <div className="grid grid-cols-[20px_1fr] items-start  mb-4">
                <div className="flex items-center h-5 w-5">
                  <input
                    id="shipping-2"
                    aria-describedby="shipping-2"
                    type="checkbox"
                    className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                    checked={isTermChecked}
                    onChange={(e) => setIsTermChecked(e.target.checked)}
                  />
                </div>
                <div className="text-sm ml-3">
                  <label
                    htmlFor="shipping-2"
                    className="font-medium text-gray-900"
                  >
                    I have read and agree to the website
                    <Link
                      href={settings.terms_and_condition_link}
                      target="_blank"
                      className="ml-1 text-blue-500 hover:underline"
                    >
                      terms and conditions
                    </Link>
                     *
                  </label>
                  <div className="text-gray-500">
                    <span className="font-normal text-xs">
                      Your personal data will be used to process your order,
                      support your experience throughout this website, and for
                      other purposes described in our privacy policy.
                    </span>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="fixed md:static flex  items-center justify-between p-2 md:p-0 shadow-lg md:shadow-none border md:border-none  bottom-0 left-0 right-0 z-50 bg-white w-[100vw] md:w-auto">
              <div className="block md:hidden font-bold">
                Total:
                <p className="font-bold flex gap-1">
                  {siteConfig.currency.icon}
                  {grandTotal}
                </p>
              </div>
              <button
                disabled={isDisabled}
                // type="submit"
                onClick={() => handleSubmit(handleCheckoutSubmit)()}
                className="btn  btn-secondary !capitalize !text-lg w-fit md:w-full disabled:bg-slate-300 disabled:cursor-not-allowed"
                style={{
                  "--btn-bg-color": isDisabled
                    ? "#cccccc"
                    : settings?.colors?.primary,
                  "--btn-text-color": settings?.colors?.primary_text,
                  opacity: isDisabled ? 0.5 : 1,
                }}
              >
                {translations["order-now"] || "Order Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <CouponModal
        showModal={showModal}
        setShowModal={setShowModal}
        // total={total} //cart items total
      />
    </section>
  );
};

export default RequireAuth(CheckoutGlamqueen);
