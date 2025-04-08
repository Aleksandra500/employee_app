import { useSelector } from "react-redux";

function LoaderComponent() {
  const { showLoader } = useSelector((state) => state.loaderStore);

  return (
    <>
      {showLoader ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-24 h-24 border-8 border-white border-t-8 border-t-blue-800 rounded-full animate-spin"></div>
        </div>
      ) : null}
    </>
  );
}

export default LoaderComponent;