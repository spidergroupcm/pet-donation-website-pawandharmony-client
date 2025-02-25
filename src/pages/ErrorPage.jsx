import { Link } from 'react-router-dom';


const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center">
       
        <h1 className="text-4xl font-bold text-gray-800 mt-6">Oops! Page Not Found</h1>
        <p className="text-gray-600 mt-2 text-center px-4">
          The page you’re looking for doesn’t exist or an error occurred. Please check the URL or go back to the homepage.
        </p>
        <Link
          to="/"
          className="mt-6 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Error;

