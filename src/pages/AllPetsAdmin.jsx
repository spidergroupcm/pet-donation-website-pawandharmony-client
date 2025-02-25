

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AllPetsAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all pets
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/pets`); 
        setPets(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };
    fetchPets();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/pets/${id}`);
        setPets(pets.filter((pet) => pet._id !== id));
        Swal.fire("Deleted!", "The pet has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting pet:", error);
        Swal.fire("Error!", "Failed to delete the pet.", "error");
      }
    }
  };

  // Handle update
  const handleUpdate = async (id) => {
    const updatedName = prompt("Enter the updated pet name:");
    if (updatedName) {
      try {
        await axiosSecure.put(`/pets/${id}`, { name: updatedName });
        setPets(
          pets.map((pet) =>
            pet._id === id ? { ...pet, name: updatedName } : pet
          )
        );
        Swal.fire("Updated!", "The pet has been updated.", "success");
      } catch (error) {
        console.error("Error updating pet:", error);
        Swal.fire("Error!", "Failed to update the pet.", "error");
      }
    }
  };

  // Handle toggle adoption status
  const handleToggleAdoptionStatus = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      await axiosSecure.put(`/pets/${id}`, { adopted: updatedStatus });
      setPets(
        pets.map((pet) =>
          pet._id === id ? { ...pet, adopted: updatedStatus } : pet
        )
      );
      Swal.fire(
        "Updated!",
        `The pet is now marked as ${
          updatedStatus ? "Adopted" : "Not Adopted"
        }.`,
        "success"
      );
    } catch (error) {
      console.error("Error updating adoption status:", error);
      Swal.fire("Error!", "Failed to update adoption status.", "error");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Pets</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">User Name</th>
            <th className="border border-gray-300 px-4 py-2">Delete</th>
            <th className="border border-gray-300 px-4 py-2">Update</th>
            <th className="border border-gray-300 px-4 py-2">Adoption Status</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet, index) => (
            <tr key={pet._id}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">{pet.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {pet.category}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {pet.userData?.name || "Unknown"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDelete(pet._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleUpdate(pet._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleToggleAdoptionStatus(pet._id, pet.adopted)}
                  className={`px-4 py-2 rounded ${
                    pet.adopted
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-black"
                  } hover:opacity-90`}
                >
                  {pet.adopted ? "Adopted" : "Not Adopted"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllPetsAdmin;

