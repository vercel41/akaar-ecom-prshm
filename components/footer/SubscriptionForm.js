"use client";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useAddToNewsletterMutation } from "@/store/features/api/contactAPI";

const SubscriptionForm = () => {
  const [addToNewsLetter] = useAddToNewsletterMutation();

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
      <div className="flex items-center justify-center">
        <input
          className="rounded-none"
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
          className="inline-block px-4 py-1 text-white bg-primary border-none text-center leading-[40px]"
          type="submit"
        >
          Submit
        </button>
      </div>
      {errors.email && <p className="errorMsg">{errors.email.message}</p>}
    </form>
  );
};

export default SubscriptionForm;
