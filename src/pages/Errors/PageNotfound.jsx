import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-100 px-4">
      
      <h1 className="text-7xl font-extrabold text-blue-600">404</h1>

      <p className="text-2xl text-gray-700 mt-4 font-semibold">
        Page Not Found
      </p>

      <p className="text-gray-500 mt-2 text-center max-w-xl">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go Home
        </button>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
