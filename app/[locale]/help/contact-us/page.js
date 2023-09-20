import Link from "next/link";
import { useTranslations } from "next-intl";

// ** Import Icons
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import ContactForm from "./ContactForm";

const ContactUs = () => {
  const t = useTranslations("contact-us");
  return (
    <>
      <div className="breadcrumb breadcrumb-2 py-5 border-b border-slate-200">
        <div className="container">
          <div>
            <Link
              href={`/`}
              className="text-base text-slate-600 hover:text-secondary"
            >
              {t("breadcrumb.home")}
            </Link>
            <Link
              href={`/help/contact-us`}
              className="text-base text-slate-900 hover:text-secondary"
            >
              {t("breadcrumb.contact")}
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="contact-us mb-20">
          <div className="heading border-b border-slate-200 py-4 mb-6">
            <h3 className="text-4xl/[48px] font-bold font-title text-slate-900">
              {t("title")}
            </h3>
          </div>
          <div className="contact-wpr flex items-center gap-12 bg-slate-200 rounded-2xl p-8">
            <ContactForm />
            <div className="address basis-2/5 bg-slate-800 rounded-lg p-6">
              <ul className="info-list">
                <li className="flex items-start gap-2 bg-slate-700 rounded-lg p-6 mb-4">
                  <FaMapMarkerAlt size={24} color="#EF4444" />
                  <p className="pr-4 text-white">{t("address")}</p>
                </li>
                <li className="flex items-center gap-2 bg-slate-700 rounded-lg p-6 mb-4">
                  <BsFillTelephoneFill size={14} color="#ffffff" />
                  <Link href={`tel:${t("phone")}`} className="text-white">
                    {t("phone")}
                  </Link>
                </li>
                <li className="flex items-center gap-2 bg-slate-700 rounded-lg p-6 mb-4">
                  <FaEnvelope ize={14} color="#ffffff" />
                  <Link
                    href="mailto:sototastall@gmail.com"
                    className="text-white"
                  >
                    sototastall@gmail.com
                  </Link>
                </li>
              </ul>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.419994637345!2d90.35608507599457!3d23.76805398809721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1e5280a3149%3A0x625fd2bcd25924aa!2sMedia365%20Limited!5e0!3m2!1sbn!2sbd!4v1684737614659!5m2!1sbn!2sbd"
                className="block border-0 rounded-lg mt-4"
                width="100%"
                height={280}
                allowFullScreen=""
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
