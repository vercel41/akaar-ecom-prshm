import Link from "next/link";
import Image from "next/image";

// ** Imoprt icons
import { BsFillTelephoneFill } from "react-icons/bs";

export default function NotFound() {
    return (
        <>
            <div className="container">
                <div className="content flex flex-col items-center py-28">
                    <Image src={`/assets/images/banner/notFound.jpg`} width={600} height={500} alt="Not Found" className="mb-12" />
                    <h2 className="text-3xl font-bold font-title text-slate-900">Page not found!</h2>
                    <p className="text-lg text-slate-600 mt-6 mb-8">We are sorry, but the page you requested could not be found.</p>
                    <Link href="/" className="inline-block font-semibold text-white bg-primary px-8 py-3">Back to home</Link>
                </div>
                {/* <div className="contact pb-12 text-center">
                    <p className="flex justify-center items-center gap-5 bg-amber-200 border border-primary rounded-xl p-4"><span className="text-xl font-bold font-title text-slate-900">Call us for any inquiry or order:</span> <Link href="tel:01720060958" className="text-xl font-bold font-title text-primary"><BsFillTelephoneFill/> 01720060958</Link></p>
                </div> */}
            </div>
        </>
    );
  }