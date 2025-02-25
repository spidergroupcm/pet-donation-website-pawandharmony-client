import React, { useState } from "react";
import Swal from "sweetalert2";

const EditDonationModal = ({ campaign, onClose, onUpdate }) => {
  const [title, setTitle] = useState(campaign?.title || "");
  const [description, setDescription] = useState(campaign?.description || "");
  const [goal, setGoal] = useState(campaign?.goal || "");
  const [photo, setPhoto] = useState(campaign?.photo || "");

  if (!campaign) {
    return null; // Prevent rendering if campaign is undefined
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedCampaign = { title, description, goal, photo };
      onUpdate(campaign._id, updatedCampaign);
      Swal.fire("Success!", "Campaign updated successfully.", "success");
      onClose();
    } catch (error) {
      Swal.fire("Error!", "Failed to update campaign.", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2">
        <h2 className="text-xl font-bold mb-4">Edit Campaign</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded p-2"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block font-medium">Goal</label>
            <input
              type="number"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Photo URL</label>
            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDonationModal;


