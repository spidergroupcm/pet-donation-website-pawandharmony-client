/* eslint-disable react/prop-types */
import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import UpdatePetModal from "../../Modal/UpdatePetModal";

const PetDataRow = ({ refetch, pet, index }) => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false); // delete modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // update modal state
  const [selectedPet, setSelectedPet] = useState(null); // store selected pet for editing

  const { image, name, category, _id, adopted } = pet || {};

  const handlePetDelete = async () => {
    try {
      await axiosSecure.delete(`/pets/${_id}`);
      toast.success("Pet successfully removed.");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error(err.response.data);
    } finally {
      setIsOpen(false);
    }
  };

  const handlePetUpdate = async (updatedPetData) => {
    try {
      await axiosSecure.put(`/pets/${_id}`, updatedPetData);
      toast.success("Pet successfully updated.");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error(err.response.data);
    } finally {
      setIsEditModalOpen(false);
    }
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <img
          alt="profile"
          src={image}
          className="mx-auto object-cover rounded h-10 w-15"
        />
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{category}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {adopted ? "Adopted" : "Not Adopted"}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => setIsOpen(true)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
        <DeleteModal
          handleDelete={handlePetDelete}
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
        />
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => {
            setSelectedPet(pet);
            setIsEditModalOpen(true);
          }}
          className="text-blue-500 hover:underline"
        >
          Update
        </button>
        <UpdatePetModal
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          initialPetData={selectedPet}
          handleUpdateSubmit={handlePetUpdate}
        />
      </td>
    </tr>
  );
};

export default PetDataRow;




