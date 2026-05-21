import Link from "next/link";
import { fetchData } from "@/lib/fetch-data";
import SubscriptionForm from "./SubscriptionForm";
import amarsolutionLogo from "../../public/assets/icons/social/amarsolution-logo.png";

// ** Import Icons
import SocialIcon from "../elements/SocialIcon";
import ScrollToTopButton from "../ScrollToTopButton";
import {
  FaFacebookF,
  FaFacebookMessenger,
  FaInstagram,
  FaPinterest,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import AppleAppDownload from "../elements/svg/AppleAppDownload";
import AndroidAppDownload from "../elements/svg/AndroidAppDownload";
import { cn } from "@/utils";

const Footer = async () => {
  const translationData = await fetchData({ api: "translations" });
  const translations = translationData?.data || {};

  const settingRes = await fetchData({ api: "info/basic" });

  const settings = settingRes?.data || {};

  const footerPage = settings?.footer_page || [];
  const helpPage = settings?.help_page || [];

  const messengerUser = settings?.facebook_link?.split("/")[3] || "no-user";

  // Dynamic Colors
  const footerBg = settings?.colors?.secondary || "#ffffff";
  const footerText = settings?.colors?.secondary_text || "#000000";

  const footerStyle = {
    backgroundColor: footerBg,
    color: footerText,
  };

  return (
    <footer
      className="footer py-5 border-t border-gray-300"
      style={footerStyle}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between gap-5 lg:gap-12 py-8">
          {/* Newsletter */}
          <div className="footer-business-info">
            <div className="pr-4 w-[80%]">
              <h6
                className="mb-4 font-noto_serif uppercase font-[700] text-[15px]"
                style={{ color: footerText }}
              >
                newsletter
              </h6>

              <p
                className="text-sm mb-3 tracking-normal"
                style={{ color: footerText }}
              >
                Subscribe to receive updates, access to exclusive deals, and
                more.
              </p>

              <SubscriptionForm settings={settings} />
            </div>
          </div>

          {/* Customer Service */}
          <div className="text-sm/6">
            <h6
              className="mb-4 font-noto_serif uppercase font-[700] text-[15px]"
              style={{ color: footerText }}
            >
              {translations["customer-service"] || "customer-service"}
            </h6>

            <ul
              className="widget-list font-normal text-[15px] tracking-normal space-y-2.5"
              style={{ color: footerText }}
            >
              <li>
                <Link
                  className="transition-opacity duration-300 hover:opacity-70"
                  style={{ color: footerText }}
                  href={"/help/contact-us"}
                >
                  {translations["contact"] || "Contact Us"}
                </Link>
              </li>

              <li>
                <Link
                  className="transition-opacity duration-300 hover:opacity-70"
                  style={{ color: footerText }}
                  href={"/blogs"}
                >
                  {translations["blogs"] || "Blogs"}
                </Link>
              </li>

              <li>
                <Link
                  className="transition-opacity duration-300 hover:opacity-70"
                  style={{ color: footerText }}
                  href={"/help/qna"}
                >
                  {translations["questions-and-queries"] ||
                    "Questions and Answer"}
                </Link>
              </li>

              {helpPage.map((page) => (
                <li key={page?.path}>
                  <Link
                    className="transition-opacity duration-300 hover:opacity-70"
                    style={{ color: footerText }}
                    href={page?.path}
                  >
                    {page?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="text-sm/6 font-light">
            <h6
              className="mb-4 font-noto_serif uppercase font-[700] text-[15px]"
              style={{ color: footerText }}
            >
              {translations["Company"] || "COMPANY"}
            </h6>

            <ul className="widget-list space-y-2.5">
              {footerPage.map((page) => (
                <li key={page?.path}>
                  <Link
                    className="transition-opacity duration-300 hover:opacity-70 text-[16px]"
                    style={{ color: footerText }}
                    href={page?.path}
                  >
                    {page?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <>
              {(settings?.ios_app_link ||
                settings?.android_app_link) && (
                <div className="footer-app">
                  <p style={{ color: footerText }}>
                    Download our app now from stores
                  </p>

                  <div className="py-4 flex max-xl:items-center gap-4 xl:flex-col">
                    {settings?.ios_app_link && (
                      <a
                        href={settings?.ios_app_link}
                        target="_blank"
                        className="flex justify-center lg:justify-start group w-max"
                      >
                        <AppleAppDownload />
                      </a>
                    )}

                    {settings?.android_app_link && (
                      <a
                        href={settings?.android_app_link}
                        target="_blank"
                        className="flex justify-center lg:justify-start group w-max"
                      >
                        <AndroidAppDownload />
                      </a>
                    )}
                  </div>
                </div>
              )}

              <div className="social-links">
                <h2
                  className="mb-4 font-noto_serif uppercase font-[700] text-[15px]"
                  style={{ color: footerText }}
                >
                  About {settings?.name}
                </h2>

                <p
                  className="tracking-normal text-[15px]"
                  style={{ color: footerText }}
                >
                  {settings?.short_description}
                </p>

                <div className="text-center py-4 flex gap-5 items-center">
                  {settings.facebook_link &&
                    settings.facebook_link !== "#" && (
                      <SocialIcon
                        href={settings.facebook_link}
                        icon={<FaFacebookF size={18} />}
                      />
                    )}

                  {settings.youtube_link &&
                    settings.youtube_link !== "#" && (
                      <SocialIcon
                        href={settings.youtube_link}
                        icon={<FaYoutube size={18} />}
                      />
                    )}

                  {settings.whatsapp_link &&
                    settings.whatsapp_link !== "#" && (
                      <SocialIcon
                        href={settings.whatsapp_link}
                        icon={<FaWhatsapp size={18} />}
                        iconClass={"w-7 h-7"}
                      />
                    )}

                  {settings.twitter_link &&
                    settings.twitter_link !== "#" && (
                      <SocialIcon
                        href={settings.twitter_link}
                        icon={<FaXTwitter size={18} />}
                      />
                    )}

                  {settings.tiktok_link &&
                    settings.tiktok_link !== "#" && (
                      <SocialIcon
                        href={settings.tiktok_link}
                        icon={<FaTiktok size={18} />}
                      />
                    )}

                  {settings.instagram_link &&
                    settings.instagram_link !== "#" && (
                      <SocialIcon
                        href={settings.instagram_link}
                        icon={<FaInstagram size={18} />}
                      />
                    )}

                  {settings.pinterest_link &&
                    settings.pinterest_link !== "#" && (
                      <SocialIcon
                        href={settings.pinterest_link}
                        icon={<FaPinterest size={18} />}
                      />
                    )}
                </div>
              </div>
            </>
          </div>
        </div>

        {/* Bottom Footer */}
        <div
          className="flex justify-between items-center border-t py-4 mt-8"
          style={{ borderColor: `${footerText}20` }}
        >
          <div className="w-full">
            <div className="text-xs md:text-sm font-normal font-body text-center flex flex-wrap gap-2 justify-center md:justify-start items-center">
              <div className="col-span-12">
                {settings?.footer_branding_section ? (
                  <div className="flex flex-wrap gap-4 items-center">
                    <div
                      className="text-sm font-normal font-body text-center flex items-center"
                      style={{ color: footerText }}
                    >
                      {translations["copyright"]}{" "}
                      {new Date().getFullYear()}{" "}
                      {translations["copyright-msg"] ||
                        "All Rights Reserved "}{" "}
                      By
                      <Link
                        href="/"
                        className="ml-1 hover:opacity-70"
                        style={{ color: footerText }}
                      >
                        {settings?.name}
                      </Link>
                    </div>

                    <div
                      className="flex items-center gap-1"
                      style={{ color: footerText }}
                    >
                      <p>Developed By</p>

                      <Link
                        href="https://amarsolution.com/"
                        target="_blank"
                        className="hover:underline"
                      >
                        <Image
                          src={amarsolutionLogo}
                          alt="logo"
                          width={117}
                          height={42}
                          className="mt-1 cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
                        />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div
                    className="text-sm font-normal font-body text-center flex items-center"
                    style={{ color: footerText }}
                  >
                    {translations["copyright"]}{" "}
                    {new Date().getFullYear()}{" "}
                    {translations["copyright-msg"] ||
                      "All Rights Reserved "}{" "}
                    By
                    <Link
                      href="/"
                      className="ml-1 hover:opacity-70"
                      style={{ color: footerText }}
                    >
                      {settings?.name}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScrollToTopButton settings={settings} />

      {/* WhatsApp */}
      {settings?.whatsapp_link &&
        settings.whatsapp_link !== "#" && (
          <Link
            className={cn(
              "fixed z-30 bottom-[12%] md:bottom-[75px] right-5 text-[#25cc64]",
              settings?.facebook_link &&
                settings.facebook_link !== "#" &&
                "bottom-[20%] md:bottom-[130px]"
            )}
            target="_blank"
            href={settings.whatsapp_link}
          >
            <FaWhatsapp size={45} />
          </Link>
        )}

      {/* Messenger */}
      {settings?.facebook_link &&
        settings.facebook_link !== "#" && (
          <Link
            className="fixed z-30 bottom-[12%] md:bottom-[75px] right-5 text-blue-500"
            target="_blank"
            href={`https://m.me/${messengerUser}`}
          >
            <FaFacebookMessenger size={45} />
          </Link>
        )}
    </footer>
  );
};

export default Footer;