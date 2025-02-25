import React, { useContext, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { imageUpload } from "../api/utils"; // Ensure this utility uploads an image and returns its URL
import { AuthContext } from "../providers/AuthProvider";

const CreateDonationCampaign = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext); // Get the current logged-in user

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsLoading(true);
        const imageUrl = await imageUpload(file); // Upload the image and get its URL
        setPhoto(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to upload the image. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      Swal.fire({
        title: "Error!",
        text: "Please upload a campaign photo.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const campaign = {
      title,
      description,
      goal,
      photo,
      email: user?.email, // Include the logged-in user's email
      creatorName: user?.displayName, // Optionally include the user's name
      date: new Date().toISOString(), // Save the creation date
      donationStatus: true, // Add the new donationStatus property
    };

    try {
      const response = await axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/campaigns`,
        campaign
      );

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Campaign created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });

        // Clear form fields after successful submission
        setTitle("");
        setDescription("");
        setGoal("");
        setPhoto(null);
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to create the campaign. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Create Donation Campaign
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Campaign Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Campaign Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
              Goal Amount (USD)
            </label>
            <input
              type="number"
              id="goal"
              placeholder="Enter goal amount"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
              Photo
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {isLoading && <p className="text-sm text-gray-500 mt-2">Uploading photo...</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            Create Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationCampaign;




