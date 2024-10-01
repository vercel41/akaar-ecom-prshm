const Loader = () => {
  return (
    <>
      <div role="status" className="animate-pulse @container w-full">
        <div className="flex items-center justify-center h-[200px] @[200px]:h-[270px] @[250px]:h-[340px]  @[300px]:h-[450px] mb-4 bg-gray-200">
          <span className="loader"></span>
        </div>
        <div className="h-4 bg-gray-200 w-56 mb-4"></div>
        <div className="h-4 w-44 bg-gray-200 mb-2.5"></div>
        <div className="h-4 w-36 bg-gray-200 mb-2.5"></div>

        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export default Loader;
