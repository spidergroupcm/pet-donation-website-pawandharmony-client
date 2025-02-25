import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AllCampaigns = () => {
  const axiosSecure = useAxiosSecure();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all campaigns
  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/campaigns`);
        setCampaigns(response.data);
      } catch (err) {
        setError("Failed to load campaigns.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Delete a campaign
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`${import.meta.env.VITE_API_URL}/campaigns/${id}`);
          setCampaigns(campaigns.filter((campaign) => campaign._id !== id));
          Swal.fire("Deleted!", "The campaign has been deleted.", "success");
        } catch (err) {
          Swal.fire("Error!", "Failed to delete the campaign.", "error");
        }
      }
    });
  };

  // Toggle pause/unpause
  const togglePause = async (id, isPaused) => {
    try {
      const updatedCampaign = { isPaused: !isPaused };
      await axiosSecure.put(`${import.meta.env.VITE_API_URL}/campaigns/${id}`, updatedCampaign);
      setCampaigns(
        campaigns.map((campaign) =>
          campaign._id === id ? { ...campaign, isPaused: !isPaused } : campaign
        )
      );
      Swal.fire(
        "Success!",
        `Campaign ${!isPaused ? "paused" : "unpaused"} successfully.`,
        "success"
      );
    } catch (err) {
      Swal.fire("Error!", "Failed to update the campaign.", "error");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Donation Campaigns</h1>
      {loading ? (
        <p>Loading campaigns...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <div key={campaign._id} className="border p-4 rounded shadow">
              <img
                src={campaign.photo}
                alt={campaign.title}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-semibold">{campaign.title}</h2>
              <p className="text-sm text-gray-600">{campaign.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Goal: ${campaign.goal}
              </p>
              <p className="text-sm text-gray-500">
                Creator: {campaign.creatorName} ({campaign.email})
              </p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => togglePause(campaign._id, campaign.isPaused)}
                  className={`px-4 py-2 rounded text-white ${
                    campaign.isPaused ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {campaign.isPaused ? "Unpause" : "Pause"}
                </button>
                <button
                  onClick={() => handleDelete(campaign._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCampaigns;


