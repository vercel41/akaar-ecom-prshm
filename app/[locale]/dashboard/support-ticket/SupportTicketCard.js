"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { getBdFormattedDate } from "@/utils/format-date";
import noImage from "@/public/assets/images/no-image.png";

function SupportTicketCard({ ticket }) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="text-slate-900 p-4 rounded-lg bg-white border border-slate-200 my-4">
			<div className="flex justify-between items-center">
				<h3>{getBdFormattedDate(ticket.created_at)}</h3>
				<span className="text-blue-500">#{ticket.id}</span>
			</div>
			<div className="border-b border-slate-300 my-3"></div>
			<div className="grid grid-cols-5 gap-4 justify-between">
				<div>
					<h3 className="text-slate-500 mb-3">অর্ডার নাম্বার:</h3>
					<h3>{ticket.order.invoice_no}</h3>
				</div>
				<div>
					<h3 className="text-slate-500 mb-3">সমস্যার ধরণ:</h3>
					<h3>{ticket.ticketType.name}</h3>
				</div>
				<div className="col-span-2">
					<h3 className="text-slate-500 mb-3">সাবজেক্ট:</h3>
					<h3>{ticket.title}</h3>
				</div>
				<div className="flex justify-end items-end">
					<button
						className="icon-btn group/toggle-btn"
						onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
					>
						{isOpen ? (
							<BsChevronUp
								size={24}
								className="group-hover/toggle-btn:text-primary"
							/>
						) : (
							<BsChevronDown
								size={24}
								className="group-hover/toggle-btn:text-primary"
							/>
						)}
					</button>
				</div>
			</div>
			{isOpen ? (
				<>
					<div className="ticket-content bg-slate-100 rounded-lg py-4 px-5 my-5">
						<p>{ticket.description}</p>
						{ticket.note && (
							<div className="relative bg-slate-200 rounded-lg p-5 mt-5">
								<div className="absolute top-0 left-10 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-5 h-5 bg-slate-200"></div>
								<p>{ticket.note}</p>
								<p className="text-right">
									{getBdFormattedDate(ticket.updated_at)}
								</p>
							</div>
						)}
					</div>
					<div className="flex gap-4">
						{ticket.images.map((image, index) => (
							<Image
								key={index}
								src={image || noImage}
								height={80}
								width={80}
								alt="product-img"
								className="h-20 w-20 object-contain"
							/>
						))}
					</div>
				</>
			) : null}
		</div>
	);
}

export default SupportTicketCard;
