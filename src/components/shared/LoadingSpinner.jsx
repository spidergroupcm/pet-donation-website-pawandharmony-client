import PropTypes from 'prop-types';

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={`${
        smallHeight ? 'h-[250px]' : 'h-[70vh]'
      } flex justify-center items-center`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-7xl p-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="space-y-4 w-full max-w-md p-4 bg-white rounded-lg shadow"
          >
            <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-full animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-5/6 animate-pulse"></div>
            <div className="h-48 bg-gray-300 rounded-md w-full animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  smallHeight: PropTypes.bool,
};

export default LoadingSpinner;


