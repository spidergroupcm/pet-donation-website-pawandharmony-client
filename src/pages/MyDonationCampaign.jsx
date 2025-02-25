import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyDonationCampaign = () => {
  const [donations, setDonations] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showDonators, setShowDonators] = useState(false);
  const [donators, setDonators] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchMyDonations = async () => {
      try {
        const response = await axiosSecure.get(`${API_URL}/campaigns/${user?.email}`);
        setDonations(response.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };
    if (user?.email) fetchMyDonations();
  }, [user, axiosSecure, API_URL]);

  const togglePauseResume = async (campaign) => {
    try {
      const updatedCampaign = { donationStatus: !campaign.donationStatus };
      const response = await axiosSecure.put(`${API_URL}/campaigns/${campaign._id}`, updatedCampaign);
      if (response.data.message === "Campaign updated successfully") {
        Swal.fire("Success!", `Campaign ${campaign.donationStatus ? "paused" : "resumed"} successfully.`, "success");
        setDonations((prev) =>
          prev.map((d) => (d._id === campaign._id ? { ...d, ...updatedCampaign } : d))
        );
      }
    } catch (error) {
      console.error("Error updating campaign:", error);
      Swal.fire("Error", "Failed to update campaign. Please try again.", "error");
    }
  };

  const viewDonators = async (campaign) => {
    try {
      const response = await axiosSecure.get(`${API_URL}/donators/${campaign._id}`);
      setDonators(response.data);
      setShowDonators(true);
    } catch (error) {
      console.error("Error fetching donators:", error);
      Swal.fire("Error", "Failed to fetch donators. Please try again.", "error");
    }
  };

  const calculateProgress = (campaign) => {
    const totalDonations = donators.reduce((sum, donator) => sum + donator.amount, 0);
    return ((totalDonations / campaign.goal) * 100).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">My Donation Campaigns</h1>
      <div className="container mx-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4">Campaign Name</th>
              <th className="py-3 px-4">Goal Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id} className="text-center">
                <td className="py-3 px-4">{donation.title}</td>
                <td className="py-3 px-4">${donation.goal}</td>
                <td className="py-3 px-4">
                  {donation.donationStatus ? "Active" : "Paused"}
                </td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => togglePauseResume(donation)}
                    className={`px-4 py-2 text-white rounded-md shadow-md ${
                      donation.donationStatus ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {donation.donationStatus ? "Pause" : "Resume"}
                  </button>
                  <button
                    onClick={() => viewDonators(donation)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                  >
                    View Donators
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDonators && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-3/4 md:w-1/2 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Donators</h2>
            <ul>
              {donators.length > 0 ? (
                donators.map((donator) => (
                  <li key={donator._id} className="mb-2">
                    Email: {donator.email} - Amount: ${donator.amount}
                  </li>
                ))
              ) : (
                <p>No donations yet.</p>
              )}
            </ul>
            <button
              onClick={() => setShowDonators(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDonationCampaign;



