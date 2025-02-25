import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Card = ({ pet }) => {
  const { name,  image, _id, petage, petlocation } = pet || {};
  

  return (
    <div className='col-span-1 cursor-pointer group shadow-lg p-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:shadow-2xl transition-all duration-300 text-white'>
      <div className='flex flex-col gap-4 w-full'>
        {/* Image Container */}
        <div className='w-full relative overflow-hidden rounded-lg'>
          <img
            className='object-cover h-64 w-full group-hover:scale-105 transition-transform duration-300 rounded-lg'
            src={image}
            alt={`${name} Image`}
          />
        </div>

        {/* Pet Details */}
        <div className='flex flex-col items-start'>
          <h3 className='font-semibold text-2xl'>{name}</h3>
          <p className='text-sm'> {petage} years</p>
          <p className='text-sm'>{petlocation}</p>
        </div>

        {/* CTA Button */}
        <Link
          to={`/pet/${_id}`}
          
          className='mt-4 inline-block px-6 py-2 bg-white text-purple-600 font-medium rounded shadow hover:bg-gray-200 transition duration-300'
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

Card.propTypes = {
  pet: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    _id: PropTypes.string,
    userData: PropTypes.shape({
      petage: PropTypes.string,
      petlocation: PropTypes.string,
    }),
  }).isRequired,
};

export default Card;

