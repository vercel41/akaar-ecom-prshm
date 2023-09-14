"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { HiArrowLongLeft } from "react-icons/hi2";
import TicketImagesUpload from "./TicketImagesUpload";

import {
  useAddSupportTicketMutation,
  useGetSupportTicketTypesQuery,
} from "@/store/features/api/supportTicketAPI";
import { useGetOrdersQuery } from "@/store/features/api/orderAPI";
import { useParams, useRouter } from "next/navigation";

export default function AddSupportTicket() {
  const { locale } = useParams();
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState([]);
  const { data: ordersData } = useGetOrdersQuery();
  const myOrders = ordersData?.data || [];
  const { data } = useGetSupportTicketTypesQuery({ locale });
  const ticketTypes = data?.data || [];

  const [addSupportTicket] = useAddSupportTicketMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUserUpdate = (data) => {
    const { orderNumber, problemType, subject, msg } = data;
    const formData = new FormData();
    if (imageFiles.length) {
      imageFiles.forEach((image) => {
        formData.append("images[]", image);
      });
    }
    formData.append("order_id", orderNumber);
    formData.append("title", subject);
    formData.append("description", msg);
    formData.append("support_ticket_type_id", problemType);

    addSupportTicket(formData)
      .unwrap()
      .then((response) => {
        // Handle the successful response if necessary
        console.log(response);
        toast.success("Support ticket added successfully!");
        router.push("/dashboard/support-ticket");
      })
      .catch((error) => {
        // Handle the error if necessary
        toast.error("Failed to add support ticket");
        console.log(error);
      });
  };

  return (
    <div className="px-10 py-6">
      <div className="heading">
        <h2 className="text-slate-900 font-bold text-2xl">
          সাপোর্ট টিকিট তৈরি করুন
        </h2>
        <Link
          href={"/dashboard/support-ticket"}
          className="icon-btn my-4 hover:text-primary"
        >
          <HiArrowLongLeft size={24} /> ফিরে যান
        </Link>
      </div>
      <div className="content">
        <form className="basis-3/5" onSubmit={handleSubmit(handleUserUpdate)}>
          <div className="grid lg:grid-cols-2 lg:gap-8">
            <div className="form-control mb-4">
              <label className="block text-base text-slate-500 mb-2">
                অর্ডার নাম্বার
              </label>

              <select
                className="select w-full h-12 text-base font-title font-normal px-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                {...register("orderNumber", {
                  required: "Order number is Required",
                })}
              >
                <option disabled selected>
                  অর্ডার নাম্বার নির্বাচন করুন
                </option>
                {myOrders.map((order) => (
                  <option key={order.id} value={order.id}>
                    {order.invoice_no}
                  </option>
                ))}
              </select>
              {errors.orderNumber && (
                <p className="errorMsg">{errors.orderNumber.message}</p>
              )}
            </div>
            <div className="form-control mb-4">
              <label className="block text-base text-slate-500 mb-2">
                সমস্যার ধরণ
              </label>

              <select
                className="select w-full h-12 text-base font-title font-normal px-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                {...register("problemType", {
                  required: "Problem type is Required",
                })}
              >
                <option disabled selected>
                  সমস্যার ধরণ নির্বাচন করুন
                </option>
                {ticketTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              {errors.problemType && (
                <p className="errorMsg">{errors.problemType.message}</p>
              )}
            </div>
          </div>
          <div className="form-control mb-4">
            <label className="block text-base text-slate-500 mb-2">
              সাবজেক্ট
            </label>
            <input
              type="text"
              name="subject"
              placeholder="সাবজেক্ট লিখুন"
              {...register("subject", {
                required: "Subject is required.",
              })}
            />
            {errors.subject && (
              <p className="errorMsg">{errors.subject.message}</p>
            )}
          </div>
          <div className="grid lg:grid-cols-2 lg:gap-8">
            <div className="form-control mb-4">
              <label className="block text-base text-slate-900 mb-2">
                মেসেজ
              </label>
              <textarea
                className="h-[148px]"
                type="text"
                name="msg"
                placeholder="আপনার মেসেজ লিখুন"
                {...register("msg", {
                  required: "Message is required.",
                })}
              />
              {errors.msg && <p className="errorMsg">{errors.msg.message}</p>}
            </div>
            <div className="form-control mb-4">
              <label className="block text-base text-slate-900 mb-2">
                সংযুক্তি ফাইল (jpg, jpeg, png and max-size: 2MB)
              </label>
              <TicketImagesUpload setImageFiles={setImageFiles} />
            </div>
          </div>
          <div className="form-control my-5">
            <label></label>
            <button
              type="submit"
              className="font-bold bg-primary py-3 text-white px-4 rounded-lg active:scale-95"
            >
              সংরক্ষন করুন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
