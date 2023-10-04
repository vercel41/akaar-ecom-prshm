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
import { AiOutlinePlus } from "react-icons/ai";
import FieldsetInput from "@/components/elements/FieldsetInput";
import Link from "next/link";

const payOptions = [
  {
    key: "COD",
    title: "Cash on Delivery",
    images: [
      { url: "/assets/images/payments/cash-on-del.png", height: 35, width: 35 },
    ],
  },
  {
    key: "Online",
    title: "Online payment",
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
      title: "Inside Dhaka",
      charges: settings?.inside_dhaka_delivery_charges,
    },
    {
      key: "outside dhaka",
      title: "Outside Dhaka",
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
      address: data.addressLine + ", " + data.city + ", " + data.country,
      alt_address: data.addressLine + ", " + data.city + ", " + data.country,
      order_items: getOrderFormattedCartItems(cart),
      payment_type: payOption.key,
      delivery_type: isDeliveryCharge ? deliveryMethod.key : "free delivery",
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
    console.log(newOrder);

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
      // console.log(newOrder);
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
    <section className="container pb-8">
      <div className="breadcrumb breadcrumb-2 py-5">
        <div className="">
          <div>
            <Link
              href={`/`}
              className="text-base text-slate-600 hover:text-secondary"
            >
              Home
            </Link>
            <Link
              href={`/checkout`}
              className="text-base text-slate-600 hover:text-secondary"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 mb-8 gap-14">
        <div className="border border-slate-200">
          <div className="border-b border-slate-200 text-center lg:text-left p-5">
            <h3 className="text-xl">{cart.length} Item In Your Bag</h3>
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
                <h4 className="text-slate-700 font-bold">Delivery Options</h4>
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
                <p>Total</p>
                <p>Tk.{total}</p>
              </div>
              <div className="flex-between my-2">
                <p>Discount Amount</p>
                <p className="">-Tk.{discountedPrice}</p>
              </div>
              <div className="flex-between my-2">
                <p>Coupon Discount</p>
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
                <p>Total with Discount</p>
                <p>Tk.{totalWithDiscount}</p>
              </div>
              {isDeliveryCharge && (
                <div className="flex-between my-2">
                  <p>Delivery Charge</p>
                  <p>Tk.{deliveryMethod.charges}</p>
                </div>
              )}
              <div className="border-b border-slate-900 my-2"></div>
              <div className="flex-between my-2 font-bold">
                <p>Grand Total</p>

                <p>
                  Tk.
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
            <h3 className="text-xl">Shipping Address</h3>
          </div>
          <div className="border-b border-slate-200">
            <form className="w-full" onSubmit={handleSubmit(handleOrderPlace)}>
              {isLoading ? (
                <ArticleLoader />
              ) : (
                <>
                  <div className="form-control mb-6">
                    <FieldsetInput
                      label={"Name"}
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
                      placeholder="Your mobile number"
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
                      label={"Address Line"}
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
                      label={"City"}
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
                  <div className="form-control mb-6">
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
                  </div>
                </>
              )}
              <div className="form-control my-8">
                <div className="border-b-2 border-slate-300 border-dashed"></div>
              </div>
              <div className="form-control">
                <h4 className="text-slate-700 font-bold">Delivery Options</h4>
                <div className="flex flex-col gap-3 mt-3">
                  {payOptions.map((option) => (
                    <div
                      key={option.key}
                      onClick={() => handlePayOptionChange(option)}
                      className="flex items-center justify-between border border-slate-200 p-3"
                    >
                      <CustomRadio
                        isChecked={payOption.key === option.key}
                        label={option.title}
                      />
                      <div className="flex gap-4">
                        {option.images.map((image) => (
                          <Image
                            key={image.url}
                            src={image.url}
                            height={image.height}
                            width={image.width}
                            alt="icon"
                            className="h-8"
                          />
                        ))}
                      </div>
                      {/* <h3>{option.title}</h3> */}
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
                  Order Now
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
