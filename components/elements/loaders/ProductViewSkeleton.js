const ProductViewSkeleton = () => {
  return (
    <>
      <div className="animate-pulse @container w-full h-full">
        <div className="flex items-center justify-center mb-4 bg-gray-200 md:w-[550px] md:h-[690px] w-full h-[480px]">
          <span className="loader"></span>
        </div>

        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export default ProductViewSkeleton;
