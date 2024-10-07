const ProductViewSkeleton = () => {
  return (
    <>
      <div className="animate-pulse @container w-full h-full">
        <div className="flex items-center justify-center mb-4 bg-gray-200 w-[550px] h-[690px]">
          <span className="loader"></span>
        </div>

        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export default ProductViewSkeleton;
