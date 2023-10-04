import Link from "next/link";
import Image from "next/image";

// ** Import Icons
import { fetchData } from "@/utils/fetchData";
import SubscriptionForm from "./SubscriptionForm";

const Footer = async () => {
  const { data: settings = {} } = await fetchData({ api: "info/basic" });

  const footerPage = settings?.footer_page || {};
  const helpPage = settings?.help_page || {};

  return (
    <footer className="footer py-5 bg-[#CFE6C9]">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl/[40px] font-title text-primary font-medium my-5">
            Treat Your Inbox
          </h2>
          <p className="mb-8 text-sm/6 font-light text-primary">
            Receive our newsletter on the latest deals and happenings. You can
            unsubscribe any time you want.
          </p>
          <SubscriptionForm />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-between gap-5 mt-8">
          <div className="text-sm/6 font-light text-primary">
            <h6 className="mb-4 font-title uppercase font-medium">
              CUSTOMER SERVICE
            </h6>
            <ul className="widget-list">
              <li>
                <Link
                  className="hover:text-secondary"
                  href={"/help/contact-us"}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="hover:text-secondary" href={"/help/qna"}>
                  Question and Answer
                </Link>
              </li>
              {Object.keys(helpPage).map((key) => (
                <li key={key}>
                  <Link className="hover:text-secondary" href={helpPage[key]}>
                    {key}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-sm/6 font-light text-primary">
            <h6 className="mb-4 font-title uppercase font-medium">Company</h6>
            <ul className="widget-list">
              {Object.keys(footerPage).map((key) => (
                <li key={key}>
                  <Link className="hover:text-secondary" href={footerPage[key]}>
                    {key}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <div className="social-links text-center py-4 flex gap-4 items-center justify-center">
              <Link
                target="_blank"
                href={settings.facebook_link}
                className="inline"
              >
                <Image
                  src="/assets/icons/social/fb.svg"
                  alt="Facebook"
                  width="24"
                  height="24"
                  className="w-6 h-6"
                />
              </Link>
              <Link
                target="_blank"
                href={settings.youtube_link}
                className="inline"
              >
                <Image
                  src="/assets/icons/social/YouTube.svg"
                  alt="Youtube"
                  width="24"
                  height="24"
                  className="w-6 h-6"
                />
              </Link>
              <Link
                target="_blank"
                href={settings.whatsapp_link}
                className="inline"
              >
                <Image
                  src="/assets/icons/social/whatsapp.png"
                  alt="TikTok"
                  width="24"
                  height="24"
                  className="w-6 h-6"
                />
              </Link>
              <Link
                target="_blank"
                href={settings.twitter_link}
                className="inline"
              >
                <Image
                  src="/assets/icons/social/twitter.svg"
                  alt="Twitter"
                  width="24"
                  height="24"
                  className="w-6 h-6"
                />
              </Link>
              <Link
                target="_blank"
                href={settings.linkedin_link}
                className="inline"
              >
                <Image
                  src="/assets/icons/social/linkedin.svg"
                  alt="Linkedin"
                  width="24"
                  height="24"
                  className="w-6 h-6"
                />
              </Link>
              {/* </div> */}
            </div>
            <p className="mt-3 text-center text-sm/6 font-light text-primary">
              &copy; {new Date().getFullYear()}, All Rights Reserved By{" "}
              <Link href="/">{settings?.name}</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
