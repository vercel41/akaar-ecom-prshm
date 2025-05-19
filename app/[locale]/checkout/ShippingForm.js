"use client"
import FieldsetInput from "@/components/elements/FieldsetInput";
import ArticleLoader from "@/components/elements/loaders/ArticleLoader";
import { siteConfig } from "@/config/site";
import cities from "./cities.json";
import React, { useEffect, useState, useRef } from "react";

const ShippingForm = ({
  register,
  handleSubmit,
  handleCheckoutSubmit,
  errors,
  user,
  isLoading,
  translations,
  setValue,
  selectedCity,
  onCityChange,
  handleDeliveryAreaChange,
  settings,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    register("city", { required: "City is required." });
    if (user?.city && !selectedCity) {
      const defaultCity = { value: user.city, label: user.city };
      setValue("city", user.city);
      setSearchTerm(user.city); // Set initial search term
      onCityChange?.(defaultCity);
    }
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [register, setValue, user?.city, selectedCity, onCityChange]);

  const handleCityChange = (city) => {
    setValue("city", city || "");
    setSearchTerm(city); // Update search term with selected city
    setIsOpen(false); // Close dropdown after selection
    const option = city ? { value: city, label: city } : null;
    onCityChange?.(option); // Notify parent
    const region = settings?.delivery_region.toLowerCase() || "Dhaka";
    let payload;
    if (city && city.toLowerCase() === region) {
      payload = {
        key: `inside dhaka`,
        title: `Inside ${settings?.delivery_region || "Dhaka"}`,
        charges: settings?.inside_dhaka_delivery_charges,
      };
    } else {
      payload = {
        key: `outside dhaka`,
        title: `Outside ${settings?.delivery_region || "Dhaka"}`,
        charges: settings?.outside_dhaka_delivery_charges,
      };
    }
    handleDeliveryAreaChange(payload);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true); // Open dropdown when typing
  };

  const filterCities = () => {
    const filter = searchTerm.toUpperCase();
    return cities.filter((city) =>
      city.toUpperCase().indexOf(filter) > -1
    );
  };

  return (
    <div className="px-6">
      <div className="text-left pb-5">
        <h3 className="text-xl">
          {translations["shipping-address"] || "Shipping Address"}
        </h3>
      </div>

      <form className="w-full" onSubmit={handleSubmit(handleCheckoutSubmit)}>
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
              {errors.name && <p className="errorMsg">{errors.name.message}</p>}
            </div>

            <div className="form-control mb-6">
              <FieldsetInput
                label={`${translations["phone-number"] || "Phone Number"}`}
                name="phone"
                defaultValue={user?.phone || user?.alt_phone_no}
                register={register("phone", {
                  required: "Phone number is required.",
                  pattern: {
                    value: siteConfig.phone.patternWithCode,
                    message: "Please enter a valid Bangladeshi number",
                  },
                })}
                type="tel"
              />
              {errors.phone && (
                <p className="errorMsg">{errors.phone.message}</p>
              )}
            </div>

            <div className="form-control mb-6">
              <FieldsetInput
                label={translations["address"] || "Address"}
                name="address"
                defaultValue={user?.address}
                register={register("address", {
                  required: "Address line is required.",
                })}
              />
              {errors.address && (
                <p className="errorMsg">{errors.address.message}</p>
              )}
            </div>

            <div className="form-control mb-6" ref={dropdownRef}>
              <label className="mb-2 block text-sm font-medium">
                {translations["city"] || "City"}
              </label>
              <div className="dropdown">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search city..."
                  className="w-full py-[10px] px-5 text-[15px] border border-gray-300 rounded focus:border-primary duration-500"
                  onClick={() => setIsOpen(!isOpen)}
                />
                {isOpen && (
                  <div className="dropdown-content absolute bg-white border border-gray-300 mt-1 max-h-60 overflow-auto z-10">
                    {filterCities().length > 0 ? (
                      filterCities().map((city, index) => (
                        <div
                          key={index}
                          onClick={() => handleCityChange(city)}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                          {city}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">
                        No matches found
                      </div>
                    )}
                  </div>
                )}
              </div>
              {errors.city && (
                <p className="errorMsg text-red-500 mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div className="form-control mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {translations["note"] || "Note"}
              </label>
              <textarea
                rows={5}
                placeholder="Notes about your order, e.g. special notes for delivery"
                className="resize-none py-[10px] px-5 w-full text-[15px] placeholder:text-[#666666] focus:border-primary duration-500"
                {...register("note")}
              ></textarea>
            </div>
          </>
        )}

        <div className="form-control my-6">
          <div className="border-b-2 border-slate-300 border-dashed"></div>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;