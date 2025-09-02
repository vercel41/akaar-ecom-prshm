import CustomRadio from "@/components/elements/CustomRadio";
import FieldsetInput from "@/components/elements/FieldsetInput";
import FieldsetTextarea from "@/components/elements/FieldsetTextArea";
import ArticleLoader from "@/components/elements/loaders/ArticleLoader";
import { siteConfig } from "@/config/site";
import { cn } from "@/utils";

const ShippingFormWithOutAreaSelect = ({
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
  const glamqueenCheckout = process.env.NEXT_PUBLIC_GLAMQUEEN_CHECKOUT === "YES";
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
                required
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
              <FieldsetTextarea
                required
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
                required
                label={`${translations["Phone Number"] || "Phone Number"}`}
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

            {/* <div className="form-control mb-6">
              <FieldsetInput
                label={translations["city"] || "City"}
                name="city"
                defaultValue={user?.city}
                register={register("city", {
                  required: "City is required.",
                })}
              />
              {errors.city && <p className="errorMsg">{errors.city.message}</p>}
            </div> */}

            {/* <div className="form-control mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {translations["note"] || "Note"}
              </label>
              <textarea
                rows={1}
                placeholder="Notes about your order, e.g. special notes for delivery"
                className="resize-none py-[10px] px-5 w-full text-[15px] placeholder:text-[#666666] focus:border-primary duration-500"
                {...register("note")}
              ></textarea>

              {/* Delivery Area */}
            {/* </div>  */}
            {glamqueenCheckout ? (
              <></>
            ) : (
              <div className="form-control mb-6">
                <FieldsetInput
                  label={translations["note"] || "Note"}
                  name="note"
                  defaultValue={user?.note}
                  register={register("note")}
                />
                {errors.note && (
                  <p className="errorMsg">{errors.note.message}</p>
                )}
              </div>
            )}
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

export default ShippingFormWithOutAreaSelect;
