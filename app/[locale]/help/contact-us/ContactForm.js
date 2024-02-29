"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useContactNowMutation } from "@/store/api/contactAPI";

const ContactForm = () => {
	const [contactNow] = useContactNowMutation();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = async (data) => {
		const newMessage = {
			name: data.name,
			email: data.email,
			// phone: data.subject,
			subject: data.subject,
			message: data.msg,
		};
		// console.log(newMessage);

		contactNow(newMessage)
			.unwrap()
			.then((response) => {
				// Handle the successful response if necessary
				toast.success("Thanks for contacting us! We'll get back to you soon.");
				reset();
			})
			.catch((error) => {
				// Handle the error if necessary
				toast.error("Failed to send your message");
				console.log(error);
			});
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
						required: "Email is required.",
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
				<button type="submit" className="submit-btn">
					Send Message
				</button>
			</div>
		</form>
	);
};

export default ContactForm;
