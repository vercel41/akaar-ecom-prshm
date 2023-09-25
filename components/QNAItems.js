"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import QAItem from "./elements/QAItem";
import { useGetFaqsQuery } from "@/store/features/api/faqsAPI";
import ItemsListLoader from "./elements/loaders/ItemsListLoader";

export default function QNAItems() {
  const { locale } = useParams();
  const { data, isLoading } = useGetFaqsQuery({ locale });
  const [open, setOpen] = useState(0);
  const faqs = data?.data || [];

  const toggleOpen = (index) => {
    if (open === index) {
      setOpen(null);
    }

    setOpen(index);
  };
  return (
    <div className="qna-wpr">
      {isLoading ? (
        <ItemsListLoader numItems={3} noImage={true} viewBoxWidth={900} />
      ) : (
        faqs?.map((item, index) => (
          <QAItem
            item={{ ...item, index }}
            key={index}
            open={open === index}
            toggleOpen={toggleOpen}
          />
        ))
      )}
    </div>
  );
}
