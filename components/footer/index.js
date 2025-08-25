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

const Footer = async () => {
  const translationData = await fetchData({ api: "translations" });
  const translations = translationData?.data || {};

  const { data: settings = {} } = await fetchData({ api: "info/basic" });

  const footerPage = settings?.footer_page || [];
  const helpPage = settings?.help_page || [];

  const messengerUser = settings?.facebook_link?.split("/")[3] || "no-user";

  return (
    <footer
      className="footer py-5 border-t border-gray-300"
      style={{
        // backgroundColor: settings?.colors?.secondary,
        backgroundColor: "#fff",
        color: settings?.colors?.secondary_text,
      }}
    >
      <div className="container">
        {/* <div className="text-center">
          <h2 className="text-3xl/[40px] font-noto_serif font-medium my-5">
            {translations["treat-your-inbox"] || "Treat your inbox"}
          </h2>
          <p className="mb-8 text-sm/6 font-light">
            {translations["receive-newsletter"] ||
              "Receive our newsletter on the latest deals and happenings. You can unsubscribe any time you want."}
          </p>
          <SubscriptionForm settings={settings} />
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between gap-5 lg:gap-12 py-8">
          <div className="footer-business-info">
            <div className="pr-4 w-[80%]">
              <h6 className="mb-4 font-noto_serif uppercase  font-[700] text-[15px]">
                newsletter
              </h6>

              <p className="text-sm mb-3 tracking-normal text-black">
                Subscribe to receive updates, access to exclusive deals, and
                more.
              </p>
              <SubscriptionForm settings={settings} />
            </div>
          </div>
          <div className="text-sm/6 ">
            <h6 className="mb-4 font-noto_serif uppercase  font-[700] text-[15px] text-black">
              {translations["customer-service"] || "customer-service"}
            </h6>
            <ul className="widget-list font-normal text-[15px] tracking-normal space-y-2.5 text-black">
              <li>
                <Link
                  className="hover:text-black transition-colors duration-500"
                  href={"/help/contact-us"}
                >
                  {translations["contact"] || "Contact Us"}
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-black transition-colors duration-500"
                  href={"/blogs"}
                >
                  {translations["blogs"] || "Blogs"}
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-black transition-colors duration-500"
                  href={"/help/qna"}
                >
                  {translations["questions-and-queries"] ||
                    "Questions and Answer"}
                </Link>
              </li>
              {helpPage.map((page) => (
                <li key={page?.path}>
                  <Link
                    className="hover:text-black transition-colors duration-500"
                    href={page?.path}
                  >
                    {page?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-sm/6 font-light">
            <h6 className="mb-4 font-noto_serif uppercase  font-[700] text-[15px] text-black">
              {translations["Company"] || "COMPANY"}
            </h6>
            <ul className="widget-list text-[#a5a5a5] space-y-2.5 ">
              {footerPage.map((page) => (
                <li key={page?.path}>
                  <Link
                    className="hover:text-black transition-colors duration-500 text-[16px] text-black"
                    href={page?.path}
                  >
                    {page?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <>
              {settings?.ios_app_link || settings?.android_app_link ? (
                <div className="footer-app">
                  <p className="">Download our app now from stores</p>
                  <div className=" py-4 flex max-xl:items-center gap-4 xl:flex-col">
                    {settings?.ios_app_link && (
                      <a
                        href={settings?.ios_app_link}
                        target="_blank"
                        className=" flex justify-center lg:justify-start group w-max"
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
              ) : null}
              <div className="social-links ">
                <h2 className="mb-4 font-noto_serif uppercase  font-[700] text-[15px] text-black">
                  About {settings?.name}
                </h2>
                <p className="tracking-normal text-[15px] text-black">
                  {settings?.short_description}
                </p>
                <div className="text-center py-4 flex gap-5 items-center">
                  {settings.facebook_link && settings.facebook_link !== "#" && (
                    <SocialIcon
                      href={settings.facebook_link}
                      icon={<FaFacebookF size={18} />}
                    />
                  )}
                  {settings.youtube_link && settings.youtube_link !== "#" && (
                    <SocialIcon
                      href={settings.youtube_link}
                      icon={<FaYoutube size={18} />}
                    />
                  )}
                  {settings.whatsapp_link && settings.whatsapp_link !== "#" && (
                    <SocialIcon
                      href={settings.whatsapp_link}
                      icon={<FaWhatsapp size={18} />}
                      iconClass={"w-7 h-7"}
                    />
                  )}
                  {settings.twitter_link && settings.twitter_link !== "#" && (
                    <SocialIcon
                      href={settings.twitter_link}
                      icon={<FaXTwitter size={18} />}
                    />
                  )}
                  {settings.tiktok_link && settings.tiktok_link !== "#" && (
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
        <div className="flex justify-between items-center border-t border-slate-50 py-4 mt-8">
          <div className="w-full">
            <div className="text-xs md:text-sm font-normal font-body text-gray-700 text-center flex flex-wrap gap-2 justify-center md:justify-start items-center">
              <p className="text-sm">
                {translations["copyright"]} {new Date().getFullYear()}
              </p>
              <p className="text-sm">
                {translations["copyright-msg"] || "All Rights Reserved "} By
              </p>
              <Link href="/" className="ms-1 text-sm">
                {settings?.name}
              </Link>
              <span className="">|</span>
              <div className="flex  items-center gap-1">
                <p className="text-xs md:text-sm"> Developed By</p>

                <Link
                  href="https://amarsolution.com/"
                  target="_blank"
                  className="text-slate-300 hover:underline"
                >
                  <Image
                    src={amarsolutionLogo}
                    alt="logo"
                    width={117}
                    height={42}
                    className=" cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
                  />
                </Link>
              </div>
            </div>
          </div>
          {/* <div className="w-1/2">
            <Image src={sslImage} alt="no-image" className="object-contain" />
          </div> */}
        </div>
      </div>
      <ScrollToTopButton settings={settings} />
      <Link
        className='fixed z-30 bottom-[75px] right-5 text-blue-500'
        target='_blank'
        href={`https://m.me/${messengerUser}`}
      >
        <FaFacebookMessenger size={45} />
      </Link>
    </footer>
  );
};

export default Footer;
