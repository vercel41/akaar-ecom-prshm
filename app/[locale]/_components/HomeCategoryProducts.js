// import Link from 'next/link'
// import { fetchData } from '@/lib/fetch-data'
// // import ProductSlider from "@/components/ProductSlider";
// import ProductList from '@/components/products/ProductList'
// import Image from 'next/image'
// // import { useSelector } from "react-redux";

// const HomeCategoryProducts = async () => {
//   const [transRes] = await Promise.allSettled([
//     fetchData({ api: 'translations' })
//   ])
//   const translations =
//     transRes.status === 'fulfilled' ? transRes.value?.data || {} : {}
//   const data = await fetchData({
//     api: 'homepage-category?no_child=1'
//   })
//   const categoryWiseProducts = data?.data || []

//   console.log('categoryWiseProducts', categoryWiseProducts)

//   return categoryWiseProducts?.length
//     ? categoryWiseProducts.map(({ category, products, images }, index) => (
//         <div key={index} className='container-fluid'>
//           <div className='py-10'>
//             <h2 className='sec-title pb-3'>{category?.category_name}</h2>
//             <Link
//               href={`/categories/${category?.slug}`}
//               className='text-lg hover:text-secondary'
//             >
//               {translations['see-all'] || 'See All'}{' '}
//             </Link>
//           </div>

//           <div className='grid grid-cols-2 gap-7'>
//             {/* Left Image Section - Sticky */}
//             <div className="sticky top-5 h-[80vh]">
//               <Image
//                 src={images?.[0]}
//                 alt='category image'
//                 height={1000}
//                 width={1000}
//                 className="w-full h-auto" // Ensure image responsiveness
//               />
//             </div>

//             {/* Right Product List Section - Scrollable */}
//             <div className="max-h-[80vh] overflow-y-auto">
//               <ProductList products={products?.slice(0, 5)} fixedItems={true} />
//             </div>
//           </div>

//           {/* <div className="">
//           <ProductSlider products={products} sliderId={index} />
//         </div> */}
//         </div>
//       ))
//     : null
// }

// export default HomeCategoryProducts

import Link from 'next/link'
import { fetchData } from '@/lib/fetch-data'
import ProductList from '@/components/products/ProductList'
import Image from 'next/image'
import ProductCard from '@/components/cards/ProductCard'

const HomeCategoryProducts = async () => {
  const [transRes] = await Promise.allSettled([
    fetchData({ api: 'translations' })
  ])
  const translations =
    transRes.status === 'fulfilled' ? transRes.value?.data || {} : {}
  const data = await fetchData({
    api: 'homepage-category?no_child=1'
  })
  const categoryWiseProducts = data?.data || []

  console.log('categoryWiseProducts', categoryWiseProducts)

  return categoryWiseProducts?.length
    ? categoryWiseProducts.map(({ category, products, images }, index) => (
        <div key={index} className='container-fluid'>
          {/* <div className="py-10">
            <h2 className="sec-title pb-3">{category?.category_name}</h2>
            <Link
              href={`/categories/${category?.slug}`}
              className="text-lg hover:text-secondary"
            >
              {translations['see-all'] || 'See All'}{' '}
            </Link>
          </div> */}

          <div className='grid md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-7 max-h-[80vh] overflow-y-auto'>
            {/* Left Image Section - Sticky */}
            <div className='md:sticky top-0 h-[90vh] pointer-events-none'>
              <video
                src='https://cdn.shopify.com/videos/c/o/v/e226a8795a7f44fa9a455584abb1a0f9.mp4'
                className='w-full h-auto'
                autoPlay
                loop
                muted
                playsInline
              ></video>
            </div>

            {/* Right Product List Section - Scrollable */}
            <div className='lg:pointer-events-auto grid grid-cols-2 gap-7'>

              {products?.map((product, i) => (
                <div
                  // className={cn(
                  //   "col-span-1",
                  //   fixedItems && i > 3 && "hidden 2xl:block"
                  // )}
                  key={i}
                >
                  <ProductCard
                    product={product}
                    // isFlashSale={isFlashSale}
                    // isSquareImage={siteConfig.isSquareImage}
                  />
                </div>
              ))}

              {/* <ProductList products={products?.slice(0, 5)} fixedItems={true} /> */}
            </div>
          </div>
        </div>
      ))
    : null
}

export default HomeCategoryProducts
