"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getMultipliedColumnTotal } from "@/utils/getTotal";
import {
  getCouponDiscount,
  getOrderFormattedCartItems,
} from "@/utils/checkoutBusinessLogics";

//components
import CartCard from "@/components/CartCard";
import CustomRadio from "@/components/elements/CustomRadio";
import CouponModal from "@/components/modals/CouponModal";
import ArticleLoader from "@/components/elements/loaders/ArticleLoader";

//store
import { clearCart, clearDiscountInfo } from "@/store/features/cartSlice";
import { usePlaceAnOrderMutation } from "@/store/features/api/orderAPI";
import { setGlobalLoader } from "@/store/features/commonSlice";

//Icons
import PayOptionIcon from "@/components/elements/svg/PayOptionIcon";
import { FiPlus } from "react-icons/fi";
import getToken from "@/utils/getToken";
import RequireAuth from "@/components/hoks/RequireAuth";

const payOptions = [
  {
    key: "COD",
    title: "ক্যাশ অন ডেলিভারি",
    images: [
      { url: "/assets/images/payments/cash-on-del.png", height: 35, width: 35 },
    ],
  },
  {
    key: "Online",
    title: "অনলাইন পেমেন্ট",
    images: [
      { url: "/assets/images/payments/sslcom.png", height: 70, width: 200 },
    ],
  },
];

const Checkout = () => {
  // Dynamic delivery charges
  const { settings } = useSelector((state) => state.common);
  // console.log(settings);
  const deliveryMethods = [
    {
      key: "inside dhaka",
      title: "ঢাকার ভিতরে",
      charges: settings?.inside_dhaka_delivery_charges,
    },
    {
      key: "outside dhaka",
      title: "ঢাকার বাহিরে",
      charges: settings?.outside_dhaka_delivery_charges,
    },
  ];

  const [payOption, setPayOption] = useState(payOptions[0]);
  const [deliveryMethod, setDeliveryMethod] = useState(deliveryMethods[0]);
  const [orderCollapsed, setOrderCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { cart, discountCoupon } = useSelector((state) => state.cart);
  const { user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const [placeAnOrder] = usePlaceAnOrderMutation();

  //slicing cart items based on orderCollapsed
  const cartItems = orderCollapsed ? cart : cart.slice(0, 3);

  const handlePayOptionChange = (option) => {
    setPayOption(option);
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
  const total = getMultipliedColumnTotal(cart, "quantity", "new_price");
  const discountedPrice = getCouponDiscount(discountCoupon, total);
  const totalWithDiscount = total - discountedPrice;

  //Handling free delivery
  const isDeliveryCharge =
    settings?.free_delivery_charges_limit === 0 ||
    settings?.free_delivery_charges_limit > totalWithDiscount;

  // console.log(isDeliveryCharge);

  const handleOrderPlace = async (data, event) => {
    dispatch(setGlobalLoader(true));

    const newOrder = {
      name: data.name,
      alt_name: data.name,
      phone: user?.country_code + user?.phone,
      alt_phone: user?.country_code + user?.alt_phone_no,
      address: data.address,
      alt_address: data.address,
      order_items: getOrderFormattedCartItems(cart),
      payment_type: payOption.key,
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

    if (payOption.key == "Online") {
      try {
        const res = await fetch("/api/payments/sslcz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(newOrder),
        });
        const data = await res.json();
        dispatch(setGlobalLoader(false));
        // console.log(data);
        if (data?.GatewayPageURL) {
          toast.success("Online payment is processing please wait");
          dispatch(clearDiscountInfo());
          dispatch(clearCart());
          window.location.replace(data.GatewayPageURL);
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        dispatch(setGlobalLoader(false));
        toast.error("Something went wrong...", error);
      }
    } else {
      placeAnOrder(newOrder)
        .unwrap()
        .then((response) => {
          // Handle the successful response if necessary
          // console.log(response);
          dispatch(clearDiscountInfo());
          dispatch(clearCart());
          dispatch(setGlobalLoader(false));
          toast.success("Order successful");
          router.push(`checkout/success/${response?.sale?.id}`);
        })
        .catch((error) => {
          // Handle the error if necessary
          dispatch(setGlobalLoader(false));
          toast.error("Failed to place an order");
          console.log(error);
        });
    }
  };

  return (
    <section className="container py-8">
      <div className="grid lg:grid-cols-2 mb-8 gap-8">
        <div className="lg:order-last bg-slate-200 rounded-lg p-6">
          <h3 className="text-xl text-slate-700 font-bold">আপনার অর্ডার</h3>
          <div className="mt-4">
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
          {isDeliveryCharge ? (
            <div className="p-4 mt-8 bg-amber-200 shadow border border-primary rounded-lg">
              <h4 className="text-slate-700 font-bold">
                ডেলিভারি মেথড নির্বাচন করুন
              </h4>
              <div className="flex justify-between items-center py-3">
                {deliveryMethods.map((dm) => (
                  <div key={dm.key} className="flex gap-2 items-center">
                    <CustomRadio
                      isChecked={deliveryMethod.key === dm.key}
                      label={dm.title}
                      onClick={() => setDeliveryMethod(dm)}
                    />
                    <p className="font-bold">৳{dm.charges}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div className="text-slate-700 p-4 rounded-lg shadow bg-white my-3">
            <div className="flex-between my-2">
              <p>মোট টাকার পরিমান</p>
              <p>৳{total}</p>
            </div>
            <div className="flex-between my-2">
              <p>ডিসকাউন্ট পাচ্ছেন</p>
              <p className="text-red-500">-৳{discountedPrice}</p>
            </div>
            <div className="flex-between my-2">
              <p>কুপন/প্রোমো ডিসকাউন্ট</p>
              {discountCoupon ? (
                <span className="text-primary">{discountCoupon.code}</span>
              ) : (
                <button
                  className="text-btn underline"
                  onClick={() => setShowModal(true)}
                >
                  কোড যোগ করুন
                </button>
              )}
            </div>
            <div className="border-b border-slate-300 my-2"></div>
            <div className="flex-between my-2">
              <p>মোট পরিমান</p>
              <p>৳{totalWithDiscount}</p>
            </div>
            {isDeliveryCharge && (
              <div className="flex-between my-2">
                <p>ডেলিভারি খরচ</p>
                <p>৳{deliveryMethod.charges}</p>
              </div>
            )}
            <div className="border-b border-slate-900 my-2"></div>
            <div className="flex-between my-2 font-bold">
              <p>পরিশোধ করতে হবে</p>

              <p>
                ৳
                {isDeliveryCharge
                  ? deliveryMethod.charges + totalWithDiscount
                  : totalWithDiscount}
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <h3 className="text-slate-700 text-xl font-bold border-b border-slate-300 py-4">
            অর্ডারটি কনফার্ম করতে আপনার নাম, ঠিকানা, মোবাইল নাম্বার, লিখে{" "}
            <span className="text-primary">অর্ডার কনফার্ম করুন</span> বাটনে
            ক্লিক করুন
          </h3>
          <form
            className="w-full mt-6"
            onSubmit={handleSubmit(handleOrderPlace)}
          >
            {isLoading ? (
              <ArticleLoader />
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control mb-4">
                    <label className="block text-base text-slate-900 mb-2">
                      আপনার নাম
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={user?.name}
                      placeholder="নাম লিখুন"
                      {...register("name", {
                        required: "Name is required.",
                      })}
                    />
                    {errors.name && (
                      <p className="errorMsg">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="form-control mb-4">
                    <label className="block text-base text-slate-900 mb-2">
                      মোবাইল নাম্বার
                    </label>
                    <input
                      type="phone"
                      name="phone"
                      defaultValue={user?.country_code + user?.phone}
                      placeholder="মোবাইল নাম্বার লিখুন"
                      {...register("phone", {})}
                      disabled={true}
                      className="cursor-not-allowed"
                    />
                    {errors.phone && (
                      <p className="errorMsg">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
                <div className="form-control mb-4">
                  <label className="block text-base text-slate-900 mb-2">
                    আপনার ঠিকানা
                  </label>
                  <textarea
                    className="h-[148px] border border-slate-300 p-4"
                    type="text"
                    name="address"
                    placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
                    {...register("address", {
                      required: "Address is required.",
                    })}
                  />
                  {errors.address && (
                    <p className="errorMsg">{errors.address.message}</p>
                  )}
                </div>
              </>
            )}
            <div className="form-control my-8">
              <div className="border-b-2 border-slate-300 border-dashed"></div>
            </div>
            <div className="form-control">
              <h3 className="inline-flex gap-2 text-xl font-bold">
                <PayOptionIcon />
                <span>আপনি কিভাবে পরিশোধ করতে চান</span>
              </h3>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {payOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => handlePayOptionChange(option)}
                    className={`rounded-lg ${
                      payOption.key === option.key
                        ? "bg-amber-200 border border-primary"
                        : "bg-slate-100"
                    } p-4 relative text-slate-700 flex flex-col justify-between gap-2`}
                  >
                    <div className="flex justify-end">
                      <CustomRadio isChecked={payOption.key === option.key} />
                    </div>
                    <div className="flex gap-4">
                      {option.images.map((image) => (
                        <Image
                          key={image.url}
                          src={image.url}
                          height={image.height}
                          width={image.width}
                          alt="icon"
                          sizes="100vh"
                        />
                      ))}
                    </div>
                    <h3>{option.title}</h3>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-control mt-11">
              <button
                disabled={!cart?.length}
                type="submit"
                className="primary-btn w-full disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                অর্ডার কনফার্ম করুন
              </button>
            </div>
          </form>
        </div>
      </div>
      <CouponModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={"কুপন কোড"}
      />
    </section>
  );
};

export default RequireAuth(Checkout);
