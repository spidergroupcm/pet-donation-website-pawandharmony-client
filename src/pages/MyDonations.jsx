import React, { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const MyDonations = () => {
  const [donations, setDonations] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext); // Access logged-in user data

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axiosSecure.get(
          `${import.meta.env.VITE_API_URL}/donations/${user?.email}` // Fetch donations for logged-in user
        );
        setDonations(response.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, [axiosSecure, user?.email]);

  const handleRefund = async (donationId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action will remove your donation. Proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, refund it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`${import.meta.env.VITE_API_URL}/donations/${donationId}`);
        setDonations(donations.filter((donation) => donation._id !== donationId)); // Update state
        Swal.fire("Refunded!", "Your donation has been removed.", "success");
      } catch (error) {
        console.error("Error requesting refund:", error);
        Swal.fire("Error!", "Unable to process your refund request. Try again.", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">My Donations</h1>
      {donations.length > 0 ? (
        <div className="container mx-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Pet Photo</th>
                <th className="py-3 px-6 text-left">Pet Title</th>
                <th className="py-3 px-6 text-left">Donated Amount</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation._id} className="border-b">
                  <td className="py-3 px-6">
                    <img
                      src={donation.photo}
                      alt={donation.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-3 px-6">{donation.title}</td>
                  <td className="py-3 px-6">${donation.amount}</td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleRefund(donation._id)}
                      className="py-2 px-4 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 focus:outline-none"
                    >
                      Ask for a Refund
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-10">
          You haven't made any donations yet.
        </p>
      )}
    </div>
  );
};

export default MyDonations;


