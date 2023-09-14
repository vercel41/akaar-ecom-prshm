"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const ActiveLink = ({ href, children }) => {
  const { locale } = useParams();
  const pathname = usePathname();
  const isActive = pathname === href || pathname.split(locale)[1] === href;

  return (
    <Link href={href} className={isActive ? "active" : ""}>
      {children}
    </Link>
  );
};

export default ActiveLink;
