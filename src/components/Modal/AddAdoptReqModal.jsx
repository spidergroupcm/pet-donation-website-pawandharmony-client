import React, { useState } from 'react';
import axios from 'axios';

const AddAdoptReqModal = ({ pet, onClose }) => {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const user = JSON.parse(localStorage.getItem('user')); // Assuming user info is stored in localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adoptionData = {
      petId: pet._id,
      petName: pet.name,
      petImage: pet.image,
      userName: user.name,
      userEmail: user.email,
      phone,
      address,
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/adopts`, adoptionData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Adoption request submitted successfully!');
      onClose();
    } catch (error) {
      console.error('Error submitting adoption request:', error);
      alert('Failed to submit adoption request.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Adopt {pet.name}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">User Name</label>
            <input type="text" value={user.name} disabled className="w-full p-2 border rounded-lg bg-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" value={user.email} disabled className="w-full p-2 border rounded-lg bg-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdoptReqModal;
