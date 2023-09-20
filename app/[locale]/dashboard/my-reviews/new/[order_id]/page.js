"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { HiArrowLongLeft } from "react-icons/hi2";
import ReviewImagesUpload from "../ReviewImagesUpload";
import {
  useAddReviewMutation,
  useGetUserReviewShowQuery,
} from "@/store/features/api/productReviewAPI";
import noImage from "@/public/assets/images/no-image.png";
import { getBdFormattedDate } from "@/utils/formatDate";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import EmojiSmile from "@/components/elements/svg/EmojiSmile";

const AddReview = ({ params }) => {
  const { order_id } = params;
  const [reviews, setReviews] = useState({});
  const [ratings, setRatings] = useState({});
  const [imageFiles, setImageFiles] = useState({});
  const [validationError, setValidationError] = useState(false);

  const { data } = useGetUserReviewShowQuery(order_id);
  const reviewShow = data?.data || {};
  const totalItemsCount = reviewShow?.products?.length || 0;

  const [createReview] = useAddReviewMutation();
  const router = useRouter();

  // Function to update the rating for a specific item
  const updateRating = (itemId, rating) => {
    // console.log(itemId, rating);
    setRatings((prevRating) => ({
      ...prevRating,
      [itemId]: rating,
    }));
  };

  // Function to update the review text for a specific item
  const updateReviewText = (itemId, newText) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [itemId]: newText,
    }));
  };

  // Function to update the image files for a specific item
  const updateImageFiles = (itemId, newFiles) => {
    setImageFiles((prevFiles) => {
      const existingFiles = prevFiles[itemId] || []; // Get the existing files for the item
      const uniqueNewFiles = newFiles.filter((file) => {
        const fileExists = existingFiles.some(
          (existingFile) =>
            existingFile.name === file.name && existingFile.size === file.size
        );
        return !fileExists;
      }); // Filter out duplicates from new files
      const updatedFiles = [...existingFiles, ...uniqueNewFiles]; // Append unique new files to existing files
      return {
        ...prevFiles,
        [itemId]: updatedFiles,
      };
    });
  };

  // Handling review creating
  const handleReviewSubmit = async () => {
    if (
      Object.keys(ratings).length !== totalItemsCount ||
      Object.keys(reviews).length !== totalItemsCount
    ) {
      setValidationError(true);
      return;
    }

    try {
      const createPromises = reviewShow?.products?.map((product, index) => {
        const formData = new FormData();
        if (imageFiles[index] && imageFiles[index].length) {
          imageFiles[index].forEach((image) => {
            formData.append("image[]", image);
          });
        }
        formData.append("sele_id", reviewShow?.id);
        formData.append("product_id", product.product_id);
        formData.append("rating", ratings[index]);
        formData.append("comment", reviews[index]);
        console.log(product.product_variant_id);
        //Variant product
        if (product.product_variant_id) {
          formData.append("product_variant_id", product.product_variant_id);
        }
        return createReview(formData);
      });
      await Promise.all(createPromises);
      toast.success("Review Added Successfully");
      router.push("/dashboard/my-reviews");
    } catch (error) {
      toast.error("Failed to add reviews");
      console.log(error);
    }
  };

  return (
    <div className="px-10 py-6">
      <div className="heading">
        <h2 className="text-slate-900 font-bold text-2xl">আমার রিভিউ</h2>
        <Link
          href={"/dashboard/my-reviews"}
          className="icon-btn my-4 hover:text-secondary"
        >
          <HiArrowLongLeft size={24} /> ফিরে যান
        </Link>
      </div>
      <div className="content mt-2">
        <div className="relative">
          <div className="sec-heading absolute top-[-10px] left-0 w-full px-8">
            <span className="bg-white text-secondary-700 px-2">
              ডেলিভারি সম্পন্ন হয়েছে:{" "}
              {getBdFormattedDate(reviewShow?.delivered_at)}
            </span>
          </div>
          <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 mb-3">
            <div className="ordered-items">
              {reviewShow?.products?.map((product, index) => (
                <div key={index}>
                  <div className={`flex gap-4 my-4`}>
                    <div className="">
                      <Image
                        src={product.image || noImage}
                        alt="product"
                        height={64}
                        width={64}
                        className="h-16 w-16"
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <h4 className="font-semibold">{product.product_name}</h4>
                      {product.color && product.size && (
                        <div className="flex items-center gap-3">
                          <div className="px-2 border border-slate-300 rounded-md">
                            {product.color}
                          </div>
                          <div className="px-2 border border-slate-300 rounded-md">
                            {product.size}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Rating Area */}
                  <div className="flex gap-4">
                    <div className="text-center">
                      <p className="font-semibold">
                        <span className="text-primary">*</span> রেটিং দিন:
                      </p>
                      <div className="bg-slate-100 h-[8.75rem] w-[10.5rem] flex flex-col justify-between gap-2 items-center p-4">
                        <div
                          style={{
                            direction: "ltr",
                            fontFamily: "sans-serif",
                            touchAction: "none",
                          }}
                        >
                          <Rating
                            size={24}
                            allowFraction
                            onClick={(rating) => updateRating(index, rating)}
                            transition
                            fillColor="#F59E0B"
                          />
                        </div>
                        <p>অসাধারণ</p>
                        <p className="text-primary">
                          <EmojiSmile />
                        </p>
                      </div>
                      {validationError && !ratings[index] && (
                        <p className="errorMsg">Rating required</p>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="form-control w-full">
                        <div className="flex-between mb-2">
                          <label className="block font-semibold text-slate-900">
                            <span className="text-primary">*</span> মতামত লিখুন:
                          </label>
                          <span className="text-base text-secondary-800">
                            যেভাবে একটি সুন্দর রিভিউ লিখবেন{" "}
                            <BsInfoCircleFill
                              size={20}
                              className="text-slate-500"
                            />
                          </span>
                        </div>
                        <textarea
                          className="h-[148px]"
                          type="text"
                          name="msg"
                          placeholder="আপনার মতামত লিখুন"
                          value={reviews[index] || ""}
                          onChange={(e) =>
                            updateReviewText(index, e.target.value)
                          }
                        />
                        {validationError && !reviews[index] && (
                          <p className="errorMsg">Review message is required</p>
                        )}
                      </div>
                      <div>
                        <ReviewImagesUpload
                          itemId={index}
                          imageFiles={imageFiles}
                          updateImageFiles={updateImageFiles}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="ml-2 my-8">
                    <h3 className="font-bold font-title">মনে রাখবেন:</h3>
                    <ul className="list-disc ml-8 text-slate-600 [&>*]:mt-1">
                      <li>
                        সর্বোচ্চ ৬টি ছবি আপলোড করা যাবে (ছবির সাইজ সর্বোচ্চ 5mb
                        হতে পারে)
                      </li>
                      <li>ছবিটি পর্যালোচনা করতে 24 ঘন্টা পর্যন্ত সময় লাগে৷</li>
                      <li>
                        আপনার পর্যালোচনা আপলোড করার আগে দয়া করে নিশ্চিত করুন যে
                        আপনি সম্প্রদায় নির্দেশিকা পূরণ করেছেন৷
                      </li>
                    </ul>
                  </div>
                  {reviewShow?.products?.length > 1 &&
                    index < reviewShow?.products?.length - 1 && (
                      <div className="border-b-2 border-dashed border-slate-300 mb-8"></div>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end my-4">
          <button onClick={handleReviewSubmit} className="submit-btn">
            রিভিউ দিন
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
