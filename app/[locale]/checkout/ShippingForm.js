// "use client";
// import FieldsetInput from "@/components/elements/FieldsetInput";
// import ArticleLoader from "@/components/elements/loaders/ArticleLoader";
// import { siteConfig } from "@/config/site";
// import DistrictData from "./District.json";
// import UpazilaData from "./ThanaUpazila.json";
// import React, { useEffect, useState, useRef } from "react";

// const ShippingForm = ({
//   register,
//   handleSubmit,
//   handleCheckoutSubmit,
//   errors,
//   user,
//   isLoading,
//   translations,
//   setValue,
//   selectedCity,
//   onCityChange,
//   handleDeliveryAreaChange,
//   settings,
// }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [upazilaSearch, setUpazilaSearch] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [isUpazilaOpen, setIsUpazilaOpen] = useState(false);
//   const [selectedDistrictId, setSelectedDistrictId] = useState(null);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     register("city", { required: "District is required." });
//     register("upazila", { required: "Upazila is required." });

//     if (user?.city && !selectedCity) {
//       const defaultCity = { value: user.city, label: user.city };
//       setValue("city", user.city);
//       setSearchTerm(user.city);
//       onCityChange?.(defaultCity);
//     }

//     const handleClickOutside = (event) => {
//       setTimeout(() => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//           setIsOpen(false);
//           setIsUpazilaOpen(false);
//         }
//       }, 100); // delay allows click handlers to fire first
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [register, setValue, user?.city, selectedCity, onCityChange]);

//   const calculateDeliveryArea = (cityName) => {
//     const region = settings?.delivery_region?.toLowerCase() || "dhaka";
//     const isInside = cityName.toLowerCase() === region;

//     return {
//       key: isInside ? "inside dhaka" : "outside dhaka",
//       title: `${isInside ? "Inside" : "Outside"} ${settings?.delivery_region || "Dhaka"}`,
//       charges: isInside
//         ? settings?.inside_dhaka_delivery_charges
//         : settings?.outside_dhaka_delivery_charges,
//     };
//   };
//   const handleDistrictChange = (cityObject) => {
//     setTimeout(() => {
//       setSearchTerm(cityObject.name);
//       setValue("city", cityObject.name);
//       setSelectedDistrictId(cityObject.id);
//       setUpazilaSearch("");
//       setValue("upazila", "");
//       setIsOpen(false);

//       const option = { value: cityObject.name, label: cityObject.name };
//       onCityChange?.(option);

//       handleDeliveryAreaChange(calculateDeliveryArea(cityObject.name));
//     }, 50);
//   };
//   const handleUpazilaChange = (upazilaName) => {
//   setUpazilaSearch(upazilaName);
//   setValue("upazila", upazilaName);
//   setIsUpazilaOpen(false);
//   handleDeliveryAreaChange(calculateDeliveryArea(searchTerm));
// };

//   const filterDistrict = () => {
//     const filter = searchTerm.toUpperCase();
//     return DistrictData.data.filter((city) =>
//       city.name.toUpperCase().includes(filter)
//     );
//   };

//   const filterUpazilaByDistrict = () => {
//   const filter = upazilaSearch.toUpperCase();

//   const district = UpazilaData.find(
//     (item) => item.district_id === selectedDistrictId?.toString()
//   );

//   if (!district) return [];

//   return district.names.filter((upazilaName) =>
//     upazilaName.toUpperCase().includes(filter)
//   );
// };

//   return (
//     <div className="px-6">
//       <div className="text-left pb-5">
//         <h3 className="text-xl">
//           {translations["shipping-address"] || "Shipping Address"}
//         </h3>
//       </div>

//       <form className="w-full" onSubmit={handleSubmit(handleCheckoutSubmit)}>
//         {isLoading ? (
//           <ArticleLoader />
//         ) : (
//           <>
//             <div className="form-control mb-6">
//               <FieldsetInput
//                 label={`${translations["name"] || "Name"}`}
//                 name="name"
//                 defaultValue={user?.name}
//                 register={register("name", { required: "Name is required." })}
//               />
//               {errors.name && <p className="errorMsg">{errors.name.message}</p>}
//             </div>

//             <div className="form-control mb-6">
//               <FieldsetInput
//                 label={`${translations["phone-number"] || "Phone Number"}`}
//                 name="phone"
//                 defaultValue={user?.phone || user?.alt_phone_no}
//                 register={register("phone", {
//                   required: "Phone number is required.",
//                   pattern: {
//                     value: siteConfig.phone.patternWithCode,
//                     message: "Please enter a valid Bangladeshi number",
//                   },
//                 })}
//                 type="tel"
//               />
//               {errors.phone && (
//                 <p className="errorMsg">{errors.phone.message}</p>
//               )}
//             </div>

//             {/* District Field */}
//             <div className="form-control mb-6" ref={dropdownRef}>
//               <label className="mb-2 block text-sm font-medium">
//                 {translations["District"] || "District"}
//               </label>
//               <div className="dropdown">
//                 <input
//                   type="text"
//                   name="District"
//                   value={searchTerm}
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     setSearchTerm(value);
//                     setIsOpen(true);
//                     if (value.trim() === "") {
//                       setSelectedDistrictId(null);
//                       setUpazilaSearch("");
//                       setValue("city", "");
//                       setValue("upazila", "");
//                     }
//                   }}

//                   placeholder="Search District..."
//                   className="w-full py-[10px] px-5 text-[15px] border border-gray-300 rounded focus:border-primary duration-500"
//                   onClick={() => setIsOpen(true)}
//                 />
//                 {isOpen && (
//                   <div className="dropdown-content absolute bg-white border border-gray-300 mt-1 max-h-60 overflow-auto z-10">
//                     {filterDistrict().length > 0 ? (
//                       filterDistrict().map((city) => (
//                         <div
//                           key={city.id}
//                           onMouseDown={() => handleDistrictChange(city)}
//                           className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
//                         >
//                           {city.name}
//                         </div>
//                       ))
//                     ) : (
//                       <div className="px-4 py-2 text-gray-500">
//                         No matches found
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//               <input type="hidden" {...register("city")} />
//               {errors.city && (
//                 <p className="errorMsg text-red-500 mt-1">
//                   {errors.city.message}
//                 </p>
//               )}
//             </div>

//             {/* Upazila Field */}
//             <div className="form-control mb-6" ref={dropdownRef}>
//               <label className="mb-2 block text-sm font-medium">
//                 {translations["Police Station (Thana/Upazila)"] || "Police Station (Thana/Upazila)"}
//               </label>
//               <div className="dropdown">
//                 <input
//                   type="text"
//                   name="upazila"
//                   value={upazilaSearch}
//                   onChange={(e) => {
//                     setUpazilaSearch(e.target.value);
//                     setIsUpazilaOpen(true);
//                   }}
//                   placeholder={
//                     selectedDistrictId ? "Search Upazila..." : "Select a Upazila "
//                   }
//                   disabled={!selectedDistrictId}
//                   className="w-full py-[10px] px-5 text-[15px] border border-gray-300 rounded focus:border-primary duration-500 disabled:bg-gray-100"
//                   onClick={() => {
//                     if (selectedDistrictId) setIsUpazilaOpen(true);
//                   }}
//                 />
//                 {isUpazilaOpen && (
//                   <div className="dropdown-content absolute bg-white border border-gray-300 mt-1 max-h-60 overflow-auto z-10">
//                     {filterUpazilaByDistrict().length > 0 ? (
//                       filterUpazilaByDistrict().map((upazila) => (
//                         <div
//                           key={upazila}
//                           onClick={() => handleUpazilaChange(upazila)}
//                           className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
//                         >
//                           {upazila}
//                         </div>
//                       ))
//                     ) : (
//                       <div className="px-4 py-2 text-gray-500">
//                         No matches found
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//               <input type="hidden" {...register("upazila")} />
//               {errors.upazila && (
//                 <p className="errorMsg text-red-500 mt-1">
//                   {errors.upazila.message}
//                 </p>
//               )}
//             </div>

//             <div className="form-control mb-6">
//               <FieldsetInput
//                 label={translations["Address Line"] || "Address Line"}
//                 name="address"
//                 defaultValue={user?.address}
//                 register={register("address", {
//                   required: "Address line is required.",
//                 })}
//               />
//               {errors.address && (
//                 <p className="errorMsg">{errors.address.message}</p>
//               )}
//             </div>

//             <div className="form-control mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 {translations["note"] || "Note"}
//               </label>
//               <textarea
//                 rows={5}
//                 placeholder="Notes about your order, e.g. special notes for delivery"
//                 className="resize-none py-[10px] px-5 w-full text-[15px] placeholder:text-[#666666] focus:border-primary duration-500"
//                 {...register("note")}
//               ></textarea>
//             </div>
//           </>
//         )}
//         <div className="form-control my-6">
//           <div className="border-b-2 border-slate-300 border-dashed"></div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ShippingForm;

import CustomRadio from "@/components/elements/CustomRadio";
import FieldsetInput from "@/components/elements/FieldsetInput";
import ArticleLoader from "@/components/elements/loaders/ArticleLoader";
import { siteConfig } from "@/config/site";
import { cn } from "@/utils";

const ShippingForm = ({
  register,
  handleSubmit,
  handleCheckoutSubmit,
  errors,
  user,
  isLoading,
  translations,
  deliveryAreas,
  handleDeliveryAreaChange,
  deliveryArea,
  deliveryCharge,
}) => {
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

            <div className="form-control mb-6">
              <FieldsetInput
                label={translations["city"] || "City"}
                name="city"
                defaultValue={user?.city}
                register={register("city", {
                  required: "City is required.",
                })}
              />
              {errors.city && <p className="errorMsg">{errors.city.message}</p>}
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

              {/* Delivery Area */}
            </div>
            {deliveryAreas && (
              <div className="lg:order-2 py-4">
                <h4 className="text-slate-700 font-bold">
                  {translations["select-delivery-area"] ||
                    "Select Delivery Area"}
                </h4>
                <div className="flex flex-col gap-3 pt-3">
                  {deliveryAreas.map((area) => (
                    <button
                      type="button"
                      key={area.key}
                      className="flex gap-2 items-center border border-slate-200 p-3"
                      onClick={() => handleDeliveryAreaChange(area)}
                    >
                      <CustomRadio
                        isChecked={deliveryArea?.key === area.key}
                        label={area.title}
                        // onClick={() => setDeliveryArea(area)}
                      />
                      <p
                        className={cn(
                          `font-semibold`,
                          !deliveryCharge && deliveryArea && "line-through"
                        )}
                      >
                        {siteConfig.currency.sign}
                        {area.charges}
                      </p>
                    </button>
                  ))}
                </div>
                {!deliveryArea && (
                  <p id="deliveryAreaError" className="hidden errorMsg">
                    You must select delivery area
                  </p>
                )}
              </div>
            )}
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
