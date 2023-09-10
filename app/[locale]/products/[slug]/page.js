import Image from "next/image";
import Link from "next/link";
import { BsFillTelephoneFill } from "react-icons/bs";
// import { HiPlayCircle } from "react-icons/hi2";

// import ProductBanner from "@/components/elements/sliders/ProductBanner";
// import ProductReview from "@/components/elements/sliders/ProductReview";
import ViewHTML from "@/components/elements/ViewHTML";
import { fetchData } from "@/utils/fetchData";

const page = async ({ params }) => {
  const { slug } = params;
  // const response = await fetchData({ api: `products/${slug}` });
  // const product = response?.data || {};

  const [settingsRes, productRes] = await Promise.allSettled([
    fetchData({ api: `info/basic` }),
    fetchData({ api: `products/${slug}` }),
  ]);

  const settings =
    settingsRes.status === "fulfilled" ? settingsRes.value?.data || {} : {};
  const product =
    productRes.status === "fulfilled" ? productRes.value?.data || [] : [];

  return (
    <div className="">
      <div className="description">
        <h4 className="text-2xl font-bold font-title text-slate-900">
          প্রডাক্টের বিবরণ:
        </h4>
        <ViewHTML htmlText={product?.details} />
        {/* <p className="text-slate-700 my-5">
          Insta360 Go 2 Tiny Mighty Action Camera 1440P 50fps স্পোর্টস ক্যামেরা
          IPX8 4M ওয়াটারপ্রুফ ফ্লোস্টেট স্ট্যাবিলাইজেশন হাইপারল্যাপ্স স্লো মোশন
          রি-মোট কন্ট্রোল অটো এডিটিং WI-FI প্রিভিউ সমর্থন করে
          <br />
          <br />
          Insta360 GO 2 হল বিশ্বের সবচেয়ে ছোট অ্যাকশন ক্যামেরা৷ এটির ওজন আপনার
          পুরানো অ্যাকশনের তুলনায় প্রায় 6X হালকা। 1/2.3 ইঞ্চি ইমেজ সেন্সর সহ,
          1440P 50fps মসৃণ এবং পরিষ্কার ভিডিও রেকর্ড করতে পারে; লেন্স গার্ড সহ 4
          মিটার IPX8 ওয়াটারপ্রুফ সমর্থন করে【 মাউন্ট এনিহোয়ার】 GO 2 এত ছোট,
          এটি যেকোনো জায়গায় ফিট করে৷ গিটার? সহজ। বিড়াল? আচ্ছা...যতক্ষণ আপনার
          বিড়াল আসলে আপনার কথা শোনে। যেকোন জায়গায় মাউন্ট আপ করতে এবং আপনার
          জীবনের সেরা মুহূর্তগুলি ক্যাপচার করতে ইন-দ্য-বক্স আনুষাঙ্গিকগুলি
          ব্যবহার করুন৷ দিগন্ত লক পুরোপুরি দিগন্ত সমতল করতে পারে; স্লো মোশন
          ফাংশন সুপার স্মুথ 120fps-এ একটি গুরুত্বপূর্ণ মুহূর্তকে 4X স্লো-মোতে
          কমিয়ে দিতে পারে
        </p>
        <ol className="list-decimal ps-4">
          <li className="text-slate-700 mb-4">
            আরও বেশি জায়গায় GO 2 মাউন্ট করুন এবং অ্যাকশনের জন্য প্রস্তুত হন
          </li>
          <li className="text-slate-700 mb-4">
            1/4&#x201D; স্ক্রু মাউন্ট এবং 2-প্রং মাউন্ট আনুষাঙ্গিক সমর্থন করে
          </li>
          <li className="text-slate-700 mb-4">
            দুটি আঠালো বেস সহ যেকোনো পৃষ্ঠে GO 2 আটকে দিন।
          </li>
        </ol>
        <div className="feature">
          <h6 className="text-base[16px] font-semibold font-title text-slate-700 mb-3">
            মূল বৈশিষ্ট্য:
          </h6>
          <ul className="list-disc ps-4">
            <li className="text-slate-700 mb-4">
              ক্ষুদ্র এবং পরাক্রমশালী: থাম্ব-আকারের অ্যাকশন ক্যামেরা যার ওজন
              মাত্র 1 আউজ। চটকদার 1440p ভিডিও শুট করতে একটি শক্তিশালী 1/2.3”
              ইমেজ সেন্সর ব্যবহার করে। 13ft পর্যন্ত শ্রমসাধ্য এবং জলরোধী
            </li>
            <li className="text-slate-700 mb-4">
              যেকোনো জায়গায় মাউন্ট করুন: পরিধানযোগ্য ক্যামেরা ডিজাইন। মাউন্ট
              GO 2 এর ম্যাগনেটিক ইন-দ্য-বক্স আনুষাঙ্গিক সহ যেকোনো জায়গায়
              হ্যান্ডস-ফ্রি শুট করুন
            </li>
            <li className="text-slate-700 mb-4">
              ফ্লোস্টেট স্টেবিলাইজেশন: ইমেজ স্টেবিলাইজেশন এবং হরাইজন লেভেলিং
              অ্যালগরিদম আপনার ভিডিও স্থির রাখে আপনি যেখানেই GO 2 মাউন্ট করুন না
              কেন। অ্যাকশন স্পোর্ট প্রস্তুত
            </li>
            <li className="text-slate-700 mb-4">
              মাল্টি-ইউজ চার্জ কেস: একটি পকেট-আকারের কেস সহ আসে যা একটি চার্জার,
              রিমোট কন্ট্রোল এবং ট্রাইপড সবই এক। 150 মিনিট পর্যন্ত ব্যাটারির
              আয়ু বাড়ায়
            </li>
            <li className="text-slate-700 mb-4">
              বাক্সে: 1x Insta360 GO 2, 1x চার্জ কেস, 1x লেন্স গার্ড
              (প্রি-ইনস্টল), 1x ম্যাগনেট পেন্ডেন্ট, 1x পিভট স্ট্যান্ড, 1x ইজি
              ক্লিপ এবং 1x টাইপ-সি চার্জ ক্যাবল।
            </li>
          </ul>
          <Image
            src={`/assets/images/shop/insta360.jpg`}
            alt="Insta 360"
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto mt-4"
          />
          <Image
            src={`/assets/images/shop/insta-quality.jpg`}
            alt="Insta 360"
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto mt-6"
          />
        </div> */}
      </div>
      {/* <div className="blogs my-8">
        <p className="text-primary mb-1">ফ্লোস্টেট স্টেবিলাইজেশন</p>
        <h4 className="text-2xl font-bold font-title text-slate-900">
          বাটারী মসৃণ ধার্মিকতা
        </h4>
        <p className="text-slate-700 mt-5">
          এটা বিশ্বাস করার জন্য আপনাকে দেখতে হবে। ফ্লোস্টেট স্টেবিলাইজেশন আপনার
          শট এবং দিগন্তকে পুরোপুরি স্থির রাখে। ঝাঁকান, বাম্প এবং রোল প্রস্তুত।
        </p>
        <div className="grid grid-cols-2 gap-5 mt-10">
          <div className="col-span-1">
            <div className="blog">
              <Image
                src={`/assets/images/shop/slowmo.jpg`}
                alt="Slow Motion"
                width={0}
                height={0}
                sizes="100vw"
                className="w-auto"
              />
              <div className="content">
                <h5 className="text-2xl font-bold font-title text-slate-900 my-4">
                  ওওওওহ আস্তে আস্তে
                </h5>
                <p className="text-slate-700">
                  গতি সামলাতে পারেননি? মাখন-মসৃণ 120fps-এ একটি গুরুত্বপূর্ণ
                  মুহূর্তকে 4x স্লো-মোতে স্লো করুন
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="blog">
              <Image
                src={`/assets/images/shop/ai.jpg`}
                alt="AI"
                width={0}
                height={0}
                sizes="100vw"
                className="w-auto"
              />
              <div className="content">
                <h5 className="text-2xl font-bold font-title text-slate-900 my-4">
                  AI হল দখল...
                </h5>
                <p className="text-slate-700">
                  FlashCut 2.0 এর সাথে আপনার সম্পাদনা করুন। AI আপনার পছন্দের
                  ক্লিপগুলি নেয়, সেগুলিকে একটি গল্পে রাখে
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="blog flex items-center gap-5">
              <Image
                src={`/assets/images/shop/magnet.jpg`}
                alt="Magnet"
                width={0}
                height={0}
                sizes="100vw"
                className="w-auto"
              />
              <div className="content">
                <h5 className="text-2xl font-bold font-title text-slate-900 my-4">
                  দেখো, হাত নেই!
                </h5>
                <p className="text-slate-700">
                  শট পেতে আর কোন ফিডলিং নেই। ম্যাগনেট প্যান্ডেন্টের সাথে আপনার
                  শার্টে GO 2 পপ করুন, রেকর্ড করতে এবং শুটিং করতে টিপুন। এমনকি
                  একটি বাচ্চাও এটি বের করতে পারে।
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="blog flex items-center gap-5">
              <div className="content">
                <h5 className="text-2xl font-bold font-title text-slate-900 my-4">
                  ওওআহহহ এটা দ্রুত।
                </h5>
                <p className="text-slate-700">
                  জ্যাম টাইমশিফ্ট মোডের সাথে একটি দ্রুত হাইপারল্যাপসে সমস্ত
                  অ্যাকশন প্যাক করুন। বাস্তব জীবনের চেয়ে 6 গুণ দ্রুত।
                </p>
              </div>
              <Image
                src={`/assets/images/shop/fastmo.jpg`}
                alt="Magnet"
                width={0}
                height={0}
                sizes="100vw"
                className="w-auto"
              />
            </div>
          </div>
        </div>
      </div> */}
      {/* <div>
        <h4 className="text-2xl font-bold font-title text-slate-900 mb-4">
          পৃথিবী তোমার খেলার মাঠ
        </h4>
        <div className="relative bg-slate-100 border-slate-200 rounded-xl p-4 pb-8">
          <ProductBanner />
        </div>
        <div className="relative bg-slate-100 border-slate-200 rounded-xl p-4 mt-8">
          <ProductReview />
        </div>
      </div> */}

      <div className="mt-8">
        <h4 className="text-2xl font-bold font-title text-slate-900 mb-4">
          যা যা সাথে থাকবে
        </h4>
        <Image
          src={
            product?.product_includes || `/assets/images/shop/accessories.jpg`
          }
          alt="Insta 360"
          width={628}
          height={510}
          className="w-full h-[510px] rounded-xl"
        />
      </div>

      {product?.review_video && (
        <div className="mt-8">
          <h4 className="text-2xl font-bold font-title text-slate-900">
            রিভিউ ভিডিও
          </h4>
          <div className="slider-imag [&>div>iframe]:rounded-xl relative mt-4">
            <ViewHTML htmlText={product?.review_video} />
          </div>
        </div>
      )}

      <div className="contact mt-8 bg-amber-200 border border-primary rounded-xl p-5 mb-4 text-center">
        <h5 className="text-2xl font-bold font-title text-slate-900 mb-3">
          আরও কিছু জানার থাকলে
        </h5>
        <p className="flex justify-center items-center gap-4">
          <span className="text-base text-slate-900">কল করুন:</span>{" "}
          <Link
            href={`tel:${settings?.phone}`}
            className="text-2xl font-bold font-title text-primary"
          >
            <BsFillTelephoneFill /> {settings?.phone}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
