"use client";
import Modal from "@/components/elements/Modal";
import Image from "next/image";
import { useState } from "react";

// ** Import Iocns
const Popup = ({ popup }) => {
  const [showPopup, setShowPopup] = useState(!!popup?.show_website_popup);

  if(!popup?.show_website_popup) return null // Don't render the popup if it's not set to show

  return (
    <Modal
      showModal={showPopup}
      bodyOnly={true}
      setShowModal={setShowPopup}
      title={"Popup"}
    >
      <div className="w-[350px] md:w-[700px] 2xl:w-[900px]">
        {popup?.popup_image && (
          <Image
            src={popup?.popup_image}
            alt="popup"
            width={900}
            height={650}
            style={{ aspectRatio: 'initial' }} // Fix aspect ratio
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </Modal>
  );
};

export default Popup;
