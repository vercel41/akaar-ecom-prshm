"use client";

import { useForm } from "react-hook-form";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data, event) => {
    event.preventDefault();

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Message sent successfully", data);
      // reset the form
      reset({
        name: "",
        email: "",
        subject: "",
        msg: "",
      });
    }

    if (!response.ok) {
      console.log("Error sending message");
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control mb-4">
        <label className="block text-base text-slate-900 mb-2">Your Name</label>
        <input
          type="text"
          name="name"
          placeholder="Type your name"
          {...register("name", {
            required: "Name is required.",
          })}
        />
        {errors.name && <p className="errorMsg">{errors.name.message}</p>}
      </div>
      <div className="form-control mb-4">
        <label className="block text-base text-slate-900 mb-2">
          Your Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Type your email"
          {...register("email", {
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email is not valid.",
            },
          })}
        />
        {errors.email && <p className="errorMsg">{errors.email.message}</p>}
      </div>
      <div className="form-control mb-4">
        <label className="block text-base text-slate-900 mb-2">Subject</label>
        <input
          type="text"
          name="subject"
          placeholder="Type subject"
          {...register("subject", {
            required: "Subject is required.",
          })}
        />
        {errors.subject && <p className="errorMsg">{errors.subject.message}</p>}
      </div>
      <div className="form-control mb-4">
        <label className="block text-base text-slate-900 mb-2">Message</label>
        <textarea
          className="h-[148px]"
          type="text"
          name="msg"
          placeholder="Type your message"
          {...register("msg", {
            required: "Message is required.",
          })}
        />
        {errors.msg && <p className="errorMsg">{errors.msg.message}</p>}
      </div>
      <div className="form-control mt-6">
        <label></label>
        <button type="submit" className="submit-btn">
          Send
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
