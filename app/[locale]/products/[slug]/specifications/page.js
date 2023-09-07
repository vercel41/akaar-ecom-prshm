import ViewHTML from "@/components/elements/ViewHTML";
import { fetchData } from "@/utils/fetchData";
import { BiPlus } from "react-icons/bi";

const Specifications = async ({ params }) => {
  const { slug } = params;
  const response = await fetchData({ api: `products/${slug}` });
  const product = response?.data || {};
  return (
    <div className="question-answer mb-8">
      <h4 className="text-2xl font-bold font-title text-slate-900">
        স্পেসিফিকেশন:
      </h4>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <ViewHTML htmlText={product?.specification} />
        {/* <div class="inline-block min-w-full shadow-sm rounded-lg overflow-hidden mb-3">
          <table class="min-w-full leading-normal">
            <thead className="bg-slate-200 text-slate-900">
              <tr>
                <th
                  colSpan={2}
                  class="px-5 py-3 border-b-2 border-slate-200 text-left font-bold text-xl uppercase tracking-wider"
                >
                  মূল বৈশিষ্ট্য
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-slate-900 whitespace-no-wrap">
                    সেন্সর রেজোলিউশন
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-slate-900 whitespace-no-wrap">
                    কার্যকরী: 9 মেগাপিক্সেল (2560 x 1440)
                  </p>
                </td>
              </tr>
              <tr>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-slate-900 whitespace-no-wrap">
                    স্লো মোশন ভিডিও রেকর্ডিং
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-slate-900 whitespace-no-wrap">
                    120 fps 1920 x 1080p এ রেকর্ড করা হয়েছে
                  </p>
                </td>
              </tr>
              <tr>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-slate-900 whitespace-no-wrap">ইমেজ</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-slate-900 whitespace-no-wrap">
                    ইমেজ স্ট্যাবিলাইজেশন ডিজিটাল <br /> এখনও ইমেজ সমর্থন DNG{" "}
                    <br />
                    (2560 x 1440)
                    <br />
                    (2560 x 2560)
                    <br />
                    (1440 x 2560)
                    <br />
                    (2938 x 1088)
                  </p>
                </td>
              </tr>
              <tr>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-slate-900 whitespace-no-wrap">ভিডিও</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-slate-900 whitespace-no-wrap">
                    ভিডিও ফরম্যাট: MP4
                    <br />
                    <br />
                    ফ্লোস্টেট স্ট্যাবিলাইজেশন (প্রো ভিডিও মোড): 2560x1440@50fps,
                    30fps, 25fps, 24fps, 1920x1080@50fps, 30fps, 25fps, 24fps
                    <br />
                    <br />
                    বেসিক স্ট্যাবিলাইজেশন (ভিডিও মোড): 2560x1440@50fps, 30fps,
                    25fps, 24fps, 1920x1080@50fps, 30fps, 25fps, 24fps
                    <br />
                    <br />
                    HDR: 2560x1440@25fps, 24fps, 1920x1080@25fps, 24fps
                    <br />
                    <br />
                    টাইমল্যাপস: 2560x1440@30fps, 1920x1080@30fps
                    <br />
                    <br />
                    টাইমশিফ্ট: 2560x1440@30fps, 1920x1080@30fps
                    <br />
                    <br />
                    স্লো মোশন: 1920x1080@120fps
                  </p>
                </td>
              </tr>
              <tr>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-slate-900 whitespace-no-wrap">ডিসপ্লে</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-slate-900 whitespace-no-wrap">স্থির এলসিডি</p>
                </td>
              </tr>
              <tr>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-slate-900 whitespace-no-wrap">USB পোর্ট</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-slate-900 whitespace-no-wrap">
                    ইনপুট: 1 x USB 3.1 Type-C অন চার্জ কেস
                    <br />
                    আউটপুট: 1 x USB 3.0 Type-C অন চার্জ কেস
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="inline-block min-w-full shadow-sm rounded-lg overflow-hidden mb-3">
          <table class="min-w-full leading-normal">
            <thead className="bg-slate-200 text-slate-900">
              <tr>
                <th
                  colSpan={2}
                  class="px-5 py-3 border-b-2 border-slate-200 text-left font-bold text-xl uppercase tracking-wider "
                >
                  ব্যাটারি তথ্য
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="px-5 py-5 border-b border-gray-200 bg-white">
                  <p class="text-slate-700 whitespace-no-wrap">
                    চার্জিং ইন্টারফেস
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white">
                  <p class="text-slate-700 whitespace-no-wrap">USB</p>
                </td>
              </tr>
              <tr>
                <td class="px-5 py-5 border-b border-gray-200 bg-white">
                  <p class="text-slate-700 whitespace-no-wrap">টাইপ</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white">
                  <p class="text-slate-700 whitespace-no-wrap">
                    রিচার্জেবল ব্যাটারি প্যাক, 1100 mAh
                    <br />
                    সর্বোচ্চ রানটাইম: প্রতি চার্জ 2.5 ঘন্টা
                  </p>
                </td>
              </tr>
              <tr>
                <td class="px-5 py-5 border-b border-gray-200 bg-white">
                  <p class="text-slate-700 whitespace-no-wrap">চার্জিং টাইম</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white">
                  <p class="text-slate-700 whitespace-no-wrap">১ ঘণ্টা</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center">
          <button className="text-btn">
            <BiPlus />
            আরও জানুন
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Specifications;
