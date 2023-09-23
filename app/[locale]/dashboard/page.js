"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  useGetCountriesQuery,
  useUpdateProfileMutation,
} from "@/store/features/api/authAPI";
import ProfileImageUpload from "./ProfileImageUpload";
import { toast } from "react-toastify";
import { getBdFormattedDate } from "@/utils/formatDate";
import axiosInstance from "@/utils/axiosInstance";
import { setUser } from "@/store/features/authSlice";
// import { useSelector } from "react-redux";

const MyProfile = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "Bangladesh",
    flag: "🇧🇩",
    code: "BD",
    dial_code: "+880",
  });
  const { data: countriesDAta, isCountriesLoading } = useGetCountriesQuery();
  const countries = countriesDAta?.data || [];

  const getCountryName = (dialCode) => {
    const country = countries.find((country) => country.dial_code === dialCode);
    return country || selectedCountry;
  };

  const [updateProfile] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleUserUpdate = async (data, event) => {
    const country = getCountryName(data.dial_code);
    const formData = new FormData();
    formData.append("image", profileImageFile || user?.image);
    formData.append("name", data.name);
    formData.append("birth_date", data.birth_date);
    formData.append("gender", data.gender);
    formData.append("email", data.email);
    formData.append("phone", user?.phone);
    formData.append("alt_phone_no", data.alt_phone_no);
    formData.append("country", country);

    updateProfile(formData)
      .unwrap()
      .then((response) => {
        // Handle the successful response if necessary
        axiosInstance.get(`user`).then((res) => {
          dispatch(setUser(res.data.data));
        });
        // console.log(response.data.data);
        toast.success("Profile updated successfully!");
        setEditMode(false);
      })
      .catch((error) => {
        // Handle the error if necessary
        toast.error("Failed to update profile");
        // console.log(error);
      });
  };

  // if (isLoading) return <p className="text-2xl text-red-500">Loading.....</p>;

  return (
    <div className="px-10 py-6">
      <form className="basis-3/5" onSubmit={handleSubmit(handleUserUpdate)}>
        <ProfileImageUpload
          profileImageFile={profileImageFile}
          setProfileImageFile={setProfileImageFile}
          editMode={editMode}
          user={user}
        />
        <div className="grid grid-cols-2 gap-8">
          <div className="form-control">
            <label className="block text-base text-slate-500 mb-2">
              আপনার নাম
            </label>
            {!editMode ? (
              <p className="text-slate-800">
                {user?.name || (
                  <span className="text-slate-300">আপনার নাম লিখুন</span>
                )}
              </p>
            ) : (
              <>
                <input
                  type="text"
                  name="name"
                  defaultValue={user?.name}
                  placeholder="আপনার নাম লিখুন"
                  {...register("name", {
                    required: "Name is required.",
                    maxLength: {
                      value: 20,
                      message: "Name is too large",
                    },
                  })}
                />
                {errors.name && (
                  <p className="errorMsg">{errors.name.message}</p>
                )}
              </>
            )}
          </div>
          <div className="form-control ">
            <label className="block text-base text-slate-500 mb-2">
              জন্ম তারিখ
            </label>
            {!editMode ? (
              <p>
                {user?.birth_date ? (
                  getBdFormattedDate(user?.birth_date)
                ) : (
                  <span className="text-slate-300">দিন/মাস/বছর</span>
                )}
              </p>
            ) : (
              <>
                <input
                  type="date"
                  name="birth_date"
                  defaultValue={user?.birth_date}
                  {...register("birth_date")}
                />
                {errors.birth_date && (
                  <p className="errorMsg">{errors.birth_date.message}</p>
                )}
              </>
            )}
          </div>
          <div className="form-control ">
            <label className="block text-base text-slate-500 mb-2">লিঙ্গ</label>
            {!editMode ? (
              <p className="text-slate-800">
                {user?.gender && user?.gender !== "Unknown" ? (
                  user?.gender
                ) : (
                  <span className="text-slate-300">লিঙ্গ নির্বাচন করুন</span>
                )}
              </p>
            ) : (
              <>
                <select
                  className="select w-full h-12 text-base font-title font-normal px-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                  {...register("gender", { required: "Gender is Required" })}
                  defaultValue={user?.gender}
                >
                  <option disabled>লিঙ্গ নির্বাচন করুন</option>
                  <option key="Male" value="Male">
                    Male
                  </option>
                  <option key="Female" value="Female">
                    Female
                  </option>
                  <option key="Others" value="Other">
                    Others
                  </option>
                </select>
                {errors.gender && (
                  <p className="errorMsg">{errors.gender.message}</p>
                )}
              </>
            )}
          </div>
          <div className="form-control ">
            <label className="block text-base text-slate-500 mb-2">
              আপনার ইমেইল (যদি থাকে)
            </label>
            {!editMode ? (
              <p className="text-slate-800">
                {user?.email || (
                  <span className="text-slate-300">ইমেইল এড্রেস লিখুন</span>
                )}
              </p>
            ) : (
              <>
                <input
                  type="email"
                  name="email"
                  defaultValue={user?.email}
                  placeholder="ইমেইল এড্রেস লিখুন"
                  {...register("email", {
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: "Email is not valid.",
                    },
                  })}
                />
                {errors.email && (
                  <p className="errorMsg">{errors.email.message}</p>
                )}
              </>
            )}
          </div>
          <div className="">
            <label className="block text-slate-500 mb-2">ফোন নাম্বার</label>
            {!editMode ? (
              <p className="text-slate-800">
                {(user?.phone && user?.country_code + user.phone) || (
                  <span className="text-slate-300">ফোন নাম্বার লিখুন</span>
                )}
              </p>
            ) : (
              <>
                {/* <div className="flex items-center"> */}
                {/* <select
                    className="h-12 text-base font-title font-normal px-2 rounded-s-lg border border-gray-300 focus:outline-none focus:border-primary"
                    {...register("dial_code")}
                  >
                    {countries.map((country) => (
                      <option
                        selected={country.name === user?.country}
                        key={country.name}
                        value={country.dial_code}
                      >
                        {country.code} ({country.dial_code})
                      </option>
                    ))}
                  </select> */}
                <input
                  type="text"
                  className="w-full rounded-lg border bg-slate-100 border-gray-300 focus:outline-none cursor-not-allowed"
                  name="phone"
                  disabled={true}
                  defaultValue={user?.country_code + user?.phone}
                />
                {/* </div> */}
                {errors.phone && (
                  <p className="errorMsg">{errors.phone.message}</p>
                )}
              </>
            )}
          </div>
          <div className="">
            <label className="block text-slate-500 mb-2">
              বিকল্প ফোন নাম্বার
            </label>
            {!editMode ? (
              <p className="text-slate-800">
                {(user?.alt_phone_no &&
                  user?.country_code + user.alt_phone_no) || (
                  <span className="text-slate-300">
                    বিকল্প ফোন নাম্বার লিখুন
                  </span>
                )}
              </p>
            ) : (
              <>
                <div className="flex items-center">
                  <select
                    className="h-12 text-base font-title font-normal px-2 rounded-s-lg border border-gray-300 focus:outline-none focus:border-primary"
                    {...register("alt_dial_code")}
                  >
                    {countries.map((country) => (
                      <option
                        selected={country.name === user?.country}
                        key={country.name}
                        value={country.dial_code}
                      >
                        {country.code} ({country.dial_code})
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    className="w-full rounded-s-none rounded-e-lg border border-l-0 border-gray-300 focus:outline-none focus:border-primary"
                    name="alt_phone_no"
                    placeholder="বিকল্প ফোন নাম্বার লিখুন"
                    defaultValue={user?.alt_phone_no}
                    {...register("alt_phone_no")}
                  />
                </div>
                {errors.alt_phone_no && (
                  <p className="errorMsg">{errors.alt_phone_no.message}</p>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 mt-10">
          <div className="form-control">
            <label></label>
            <button
              type="button"
              onClick={() => setEditMode((prevMode) => !prevMode)}
              className="text-secondary-700 font-bold border border-secondary-700 py-3 px-4 rounded-lg active:scale-95"
            >
              {editMode ? "বাতিল করুন" : "সম্পাদন করুন"}
            </button>
          </div>
          {editMode ? (
            <div className="form-control">
              <label></label>
              <button
                type="submit"
                className="font-bold bg-primary py-3 text-white px-4 rounded-lg active:scale-95"
              >
                সংরক্ষন করুন
              </button>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
