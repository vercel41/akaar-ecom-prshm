import React from "react";
import OrderStep from "./OrderStep";
import ItemsListLoader from "@/components/elements/loaders/ItemsListLoader";

export default function OrderTracking({ orderData, isLoading }) {
  const { seleStatus: saleStatus } = orderData || {};
  // console.log(saleStatus);
  return (
    <div className="bg-white rounded-lg min-h-[300px] p-5">
      <h3 className="text-xl font-bold font-title">পার্সেল ট্র্যাকিং</h3>
      <div className="pl-2 pt-4">
        {isLoading ? (
          <ItemsListLoader numItems={3} noImage={true} viewBoxWidth={900} />
        ) : (
          <ol className="relative text-slate-600">
            <OrderStep
              date={saleStatus?.Complete?.created_at}
              title={"সম্পন্ন হয়েছে"}
              message={`আপনি আপনার প্রডাক্ট হাতে পেয়েছেন`}
              isComplete={saleStatus?.Complete}
            />
            <OrderStep
              date={saleStatus?.Delivery?.created_at}
              title={"ডেলিভারিতে"}
              message={`আপনার পণ্য ডেলিভারির জন্য দেওয়া হয়েছে`}
              isComplete={saleStatus?.Delivery}
            />
            <OrderStep
              date={saleStatus?.PackingCompleat?.created_at}
              title={"প্যাকি সম্পন্ন"}
              message={`আপনার প্রডাক্টি প্যাক করা হয়েছে`}
              isComplete={saleStatus?.PackingCompleat}
            />
            <OrderStep
              date={saleStatus?.Packing?.created_at}
              title={"প্যাকিং"}
              message={`আমরা আপনার প্রডাক্টি প্যাক করছি`}
              isComplete={saleStatus?.Packing}
            />
            <OrderStep
              date={saleStatus?.Confirm?.created_at}
              title={"নিশ্চিত"}
              message={`আপনার অর্ডার নিশ্চিত করা হয়েছে`}
              isComplete={saleStatus?.Confirm}
            />
            <OrderStep
              date={saleStatus?.Processing?.created_at}
              title={"প্রসেসিং"}
              message={`আপনার অর্ডার পেয়েছি, আমাদের প্রতিনিধি শিঘ্রই অর্ডার নিশ্চিত করবে`}
              isComplete={saleStatus?.Processing}
            />
            <OrderStep
              date={saleStatus?.Pending?.created_at}
              title={"অর্ডার প্লেসড"}
              message={`আপনার অর্ডার সফলভাবে প্লেসড হয়েছে৷ আপনার অর্ডার
            আইডি #${orderData?.sale?.invoice_no}`}
              isComplete={saleStatus?.Pending}
            />
          </ol>
        )}
      </div>
    </div>
  );
}
