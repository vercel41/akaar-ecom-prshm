import Image from "next/image";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

export default function SocialIcon({
  href,
  icon,
  name,
  linkClass,
  iconClass,
  ...props
}) {
  return (
    <Link
      target="_blank"
      href={href || "/"}
      className={twMerge("inline", linkClass)}
      {...props}
    >
      {/* <Image
        src={icon}
        alt={name || "social-icon"}
        width="24"
        height="24"
        className={twMerge("w-6 h-6", iconClass)}
      /> */}
      <span className={twMerge("w-6 h-6", iconClass)}>{icon}</span>
    </Link>
  );
}
