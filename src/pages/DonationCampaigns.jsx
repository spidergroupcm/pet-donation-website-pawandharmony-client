import React, { useEffect, useState, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";

const stripePromise = loadStripe(import.meta.env.VITE__Payment_Gateway_PK);

const DonationCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext); // Access user from the auth context

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/campaigns`);
        setCampaigns(response.data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, [axiosSecure]);

  const handleDonate = async (campaign) => {
    const stripe = await stripePromise;

    try {
      const response = await axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/create-payment-intent`,
        { price: campaign.goal }
      );

      const { clientSecret } = response.data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: { token: "tok_visa" }, // Replace this in production
        },
      });

      if (result.error) {
        Swal.fire({
          title: "Error!",
          text: "Payment failed. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else if (result.paymentIntent.status === "succeeded") {
        await axiosSecure.post(`${import.meta.env.VITE_API_URL}/donations`, {
          campaignId: campaign._id,
          title: campaign.title,
          email: user?.email,
          amount: campaign.goal,
          date: new Date(),
          photo: campaign.photo
        });
        Swal.fire({
          title: "Success!",
          text: "Donation successful! Thank you for your support!",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error during donation:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">All Donation Campaigns</h1>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign._id} className="bg-white rounded-lg shadow-md p-6">
            <img
              src={campaign.photo}
              alt={campaign.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{campaign.title}</h3>
            <p className="text-gray-600 mb-4">{campaign.description}</p>
            <p className="text-gray-700 font-bold mb-4">Goal: ${campaign.goal}</p>
            <button
              onClick={() => handleDonate(campaign)}
              disabled={!campaign.donationStatus}
              className={`w-full py-2 px-4 font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                campaign.donationStatus
                  ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            >
              {campaign.donationStatus ? "Donate" : "Donation Closed"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationCampaigns;


