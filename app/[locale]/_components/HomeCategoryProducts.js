import Link from 'next/link'
import { fetchData } from '@/lib/fetch-data'
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

  return categoryWiseProducts?.length
    ? categoryWiseProducts.map(({ category, products }, index) => (
        <div key={index} className="container-fluid no-scrollbar overflow-y-auto max-h-screen">
          <div className="grid md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-7">
            {/* Left Video Section - Sticky */}
            <div className="sticky top-0 h-screen">
              <video
                src="https://cdn.shopify.com/videos/c/o/v/e226a8795a7f44fa9a455584abb1a0f9.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              ></video>
            </div>

            {/* Right Product List Section */}
            <div className="grid grid-cols-2 gap-7">
              {products?.map((product, i) => (
                <div key={i}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))
    : null
}

export default HomeCategoryProducts