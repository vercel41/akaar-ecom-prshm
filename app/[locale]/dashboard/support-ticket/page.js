"use client";
import { useState } from "react";
import { HiPlus } from "react-icons/hi2";
import SupportTicketCard from "./SupportTicketCard";
import NoItems from "../NoItems";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetSupportTicketQuery } from "@/store/features/api/supportTicketAPI";
import { getCountByKeyNotValue, getCountByKeyValue } from "@/utils/itemsCount";
import ItemsListLoader from "@/components/elements/loaders/ItemsListLoader";

export default function SupportTicket() {
  const { locale } = useParams();
  const [selectedTab, setSelectedTab] = useState("running");
  const { data, isLoading } = useGetSupportTicketQuery({ locale });
  const supportTickets = data?.data || [];
  let filteredTickets = [];
  if (selectedTab === "Completed") {
    filteredTickets = supportTickets.filter(
      (ticket) => ticket?.status === "Completed"
    );
  } else {
    filteredTickets = supportTickets.filter(
      (ticket) => ticket?.status !== "Completed"
    );
  }
  return (
    <div className="px-10 py-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-slate-900 font-title font-bold text-2xl">
          সাপোর্ট টিকিট
        </h2>
        <Link
          href={"/dashboard/support-ticket/new"}
          className="text-secondary-700 font-bold border border-secondary-700 py-2 px-3 rounded-lg active:scale-95 cursor-pointer"
        >
          <HiPlus className="font-bold" /> নতুন টিকিট
        </Link>
      </div>
      <div className="flex items-center mt-4 gap-4 border-b border-slate-300">
        <button
          className={`font-title bg-transparent box-border py-2 border-b-2 ${
            selectedTab === "running" ? "border-primary" : "border-transparent"
          }`}
          onClick={() => setSelectedTab("running")}
        >
          <span>
            রানিং টিকিট (
            {getCountByKeyNotValue(supportTickets, "status", "Completed")})
          </span>
        </button>
        <button
          className={`font-title bg-transparent box-border py-2 border-b-2 ${
            selectedTab === "Completed"
              ? "border-primary"
              : "border-transparent"
          }`}
          onClick={() => setSelectedTab("Completed")}
        >
          <span>
            সম্পন্ন হয়েছে (
            {getCountByKeyValue(supportTickets, "status", "Completed")})
          </span>
        </button>
      </div>
      {isLoading ? (
        <div className="py-4">
          <ItemsListLoader itemHeight={110} noImage={true} viewBoxWidth={900} />
        </div>
      ) : (
        <div className="support-tickets pt-4">
          {filteredTickets?.length ? (
            filteredTickets.map((ticket) => (
              <SupportTicketCard key={ticket.id} ticket={ticket} />
            ))
          ) : (
            <NoItems title={"কোন টিকিট নেই"} />
          )}
        </div>
      )}
    </div>
  );
}
