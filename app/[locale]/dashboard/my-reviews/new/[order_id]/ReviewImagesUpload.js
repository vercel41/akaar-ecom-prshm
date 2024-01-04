"use client";

import Image from "next/image";
import React, { useState } from "react";
import { BsCameraFill } from "react-icons/bs";

const ReviewImagesUpload = ({ itemId, imageFiles, updateImageFiles }) => {
  const [validationError, setValidationError] = useState("");

  const validateImages = (files) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    const maxSize = 5 * 1024 * 1024; // 5MB

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!allowedExtensions.test(file.name)) {
        return "Only JPG, JPEG, and PNG files are allowed.";
      }
      if (file.size > maxSize) {
        return "File size exceeds the maximum limit of 5MB.";
      }
    }

    return "";
  };

  const handleImageUpload = (id, e) => {
    const files = Array.from(e.target.files);
    const validationError = validateImages(files);
    if (validationError) {
      setValidationError(validationError);
      return;
    }
    updateImageFiles(itemId, files);
    if (files.length) setValidationError("");
  };

  return (
    <>
      <div className="flex gap-4 mt-3">
        {imageFiles[itemId] &&
          imageFiles[itemId].map((file, index) => (
            <div key={index} className="w-24 h-24">
              <Image
                src={URL.createObjectURL(file)}
                alt={`Image ${index}`}
                height={96}
                width={96}
                className="object-cover h-full rounded-lg"
              />
            </div>
          ))}
        <label
          htmlFor={`image-upload-${itemId}`}
          className="w-24 h-24 py-2 px-1 text-center border-2 border-dashed border-slate-300 rounded-lg cursor-pointer text-slate-500"
        >
          <BsCameraFill size={24} />
          <p className="text-sm mt-2">ছবি আপলোড করুন</p>
          <input
            type="file"
            accept="image/*"
            id={`image-upload-${itemId}`}
            name="image"
            className="hidden"
            multiple
            onChange={(e) => handleImageUpload(itemId, e)}
          />
        </label>
      </div>
      {validationError && (
        <div className="text-red-500 mt-2">{validationError}</div>
      )}
    </>
  );
};

export default ReviewImagesUpload;
