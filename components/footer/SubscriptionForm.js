"use client";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useAddToNewsletterMutation } from "@/store/features/api/contactAPI";
import { useSelector } from "react-redux";

const SubscriptionForm = ({ settings }) => {
  const [addToNewsLetter] = useAddToNewsletterMutation();
  const { translations } = useSelector((state) => state.common);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const newMessage = {
      email: data.email,
    };
    // console.log(newMessage);

    addToNewsLetter(newMessage)
      .unwrap()
      .then((response) => {
        // Handle the successful response if necessary
        toast.success("Thank you for subscribe us.");
        reset();
      })
      .catch((error) => {
        // Handle the error if necessary
        toast.error("Failed to subscribe");
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex md:justify-center p-5 ">
        <div className="w-full md:w-[500px] flex items-center">
          <input
            style={{
              border: `1px solid ${settings?.colors?.primary}`,
            }}
            className="rounded-none w-full"
            type="email"
            name="email"
            placeholder="example@email.com"
            {...register("email", {
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid.",
              },
              required: "Email is required.",
            })}
          />
          <button
            className="inline-block px-4 py-1 border-none text-center leading-[40px]"
            type="submit"
            style={{
              backgroundColor: settings?.colors?.primary,
              color: settings?.colors?.primary_text,
            }}
          >
            {translations["submit"] || "Submit"}
          </button>
        </div>
      </div>
      {errors.email && <p className="errorMsg">{errors.email.message}</p>}
    </form>
  );
};

export default SubscriptionForm;
