import { fetchData } from "@/lib/fetch-data";
import Image from "next/image";
import Link from "next/link";

const GetDirectionSection = async () => {
  const { data: settings = {} } = await fetchData({ api: "info/basic" });

  return (
    <div>
      <div className="bg-[url('/assets/images/banner/get-direction-bg.webp')] w-full bg-cover bg-center bg-no-repeat bg-fixed mb-20">
        <div className="md:px-14 md:py-28 py-20">
          <div className="md:max-w-[430px] w-full bg-white px-5 py-10 text-center flex flex-col items-center justify-center">
            <h3 className="text-[17px] text-[#1c1b1b] font-bold mb-6">
              OUR FLAGSHIP STORE
            </h3>
            <div className="flex flex-col gap-2 tracking-normal mb-8">
              <p>Purusham, Target Mall, Chandavarkar Rd,</p>
              <p>Opp. Rajmahal Hotel, Borivali,</p>
              <p>Mumbai, Maharashtra – 400092</p>
              <div className="flex flex-col gap-2 mt-6">
                <p className="italic">Thursday Closed</p>
                <p>Timings: 11:00 AM - 7:00 PM</p>
              </div>
            </div>

            <Link
              href="/contact-us"
              className="btn btn-secondary"
              style={{
                "--btn-bg-color": `${settings?.colors?.primary}`,
                "--btn-text-color": `${settings?.colors?.primary_text}`,
              }}
            >
              Get Directions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetDirectionSection;
