import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useContext } from 'react';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import Container from '../../components/shared/Container';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../providers/AuthProvider';

const PetDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const currentUserName = user?.displayName || 'Unknown User';
  const currentUserEmail = user?.email || 'Unknown Email';

  const {
    data: pet = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['pet', id],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/pets/${id}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500 text-center">Failed to load pet details.</p>;

  const { image, name, userData, petage, petlocation, petbreed, shortdescription, adopted } = pet;

  const handleAdoptSubmit = async (e) => {
    e.preventDefault();
    const adoptionData = {
      petId: id,
      petName: name,
      petImage: image,
      petBreed: petbreed,
      petAge: petage,
      petDescription: shortdescription,
      petLocation: petlocation,
      userName: currentUserName,
      userEmail: currentUserEmail,
      phone,
      address,
    };

    try {
      await axiosSecure.post(`${import.meta.env.VITE_API_URL}/adopts`, adoptionData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Adoption request submitted successfully!');
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to submit adoption request.');
    }
  };

  return (
    <Container>
      <Helmet>
        <title>{name ? `Pet Details | ${name}` : 'Pet Details'}</title>
      </Helmet>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12 mt-10">
        <div className="flex-1">
          <img
            className="w-full h-96 object-cover rounded-lg shadow-md"
            src={image || '/placeholder-image.png'}
            alt={name || 'Pet'}
          />
          <div className="mt-6">
            <p className="text-lg font-semibold">Owner: {userData?.name || 'Unknown Owner'}</p>
            <p className="text-gray-500">Email: {userData?.email || 'No email available'}</p>
          </div>
        </div>
        <div className="flex-1 p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-4xl font-bold">{name || 'Unnamed Pet'}</h1>
          <p className="text-gray-700 mt-4">{shortdescription || 'No detailed description available.'}</p>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-500">Breed</p>
            <p className="text-lg font-semibold">{petbreed || 'Unknown'}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-500">Age</p>
            <p className="text-lg font-semibold">{petage || 'Unknown'}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-500">Location</p>
            <p className="text-lg font-semibold">{petlocation || 'Unknown'}</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={adopted}
            className={`mt-6 px-6 py-3 text-lg font-bold text-white rounded-lg ${
              adopted ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {adopted ? 'Already Adopted' : 'Adopt'}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Adopt {name}</h2>
            <form onSubmit={handleAdoptSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">User Name</label>
                <input
                  type="text"
                  value={currentUserName}
                  disabled
                  className="w-full mt-1 p-2 border rounded-md bg-gray-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={currentUserEmail}
                  disabled
                  className="w-full mt-1 p-2 border rounded-md bg-gray-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 mr-2 text-gray-700 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-lg">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Container>
  );
};

export default PetDetails;


