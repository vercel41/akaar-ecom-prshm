"use client";
import React, { useEffect, useState } from "react";
import {
  EmailShareButton,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { BiLogoMessenger } from "react-icons/bi";
import { RiTwitterXFill } from "react-icons/ri";

const ShareButton = ({
  ButtonComponent,
  IconComponent,
  url,
  color,
  iconSize,
}) => (
  <ButtonComponent
    url={url}
    className="flex flex-col md:flex-row items-center mr-2 gap-3 my-3 "
  >
    <div className="rounded-full w-[30px] h-[30px] flex justify-center items-center bg-slate-50 hover:bg-hovercolor">
      <IconComponent size={iconSize || 16} color={color} />
    </div>
  </ButtonComponent>
);

export default function SocialShare({ translations = {} }) {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center w-full lg:px-4 text-base">
        <ShareButton
          ButtonComponent={FacebookShareButton}
          IconComponent={FaFacebookF}
          url={currentUrl}
          color="#3b5998"
        />
        <ShareButton
          ButtonComponent={FacebookMessengerShareButton}
          IconComponent={BiLogoMessenger}
          url={currentUrl}
          color="#00acee"
          iconSize={22}
        />
        <ShareButton
          ButtonComponent={WhatsappShareButton}
          IconComponent={FaWhatsapp}
          url={currentUrl}
          color="#40C351"
          iconSize={18}
        />

        <ShareButton
          ButtonComponent={TwitterShareButton}
          IconComponent={RiTwitterXFill}
          url={currentUrl}
          color="#000000"
        />
      </div>
    </div>
  );
}
