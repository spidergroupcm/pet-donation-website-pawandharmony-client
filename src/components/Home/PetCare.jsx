import { useState } from "react";
import { FaPaw, FaBath, FaHeart, FaRegCheckCircle } from "react-icons/fa";

const PetCare = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleModalOpen = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="py-10 bg-blue-100 text-center">
      
      <div className="flex flex-wrap justify-center gap-4">
        {/* Feeding & Nutrition Card */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs w-full hover:scale-105 transform transition duration-300">
          <FaPaw className="text-blue-500 text-5xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-4">Feeding & Nutrition</h3>
          <p className="text-lg mb-6">
            Ensure your pet is well-fed with a balanced diet. Learn the best food for different pets.
          </p>
          <button
            onClick={() =>
              handleModalOpen(
                "Feeding & Nutrition: Ensure your pet gets a balanced diet based on their age, size, and breed. Check for the best pet food brands that provide all essential nutrients."
              )
            }
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Learn More
          </button>
        </div>

        {/* Grooming & Hygiene Card */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs w-full hover:scale-105 transform transition duration-300">
          <FaBath className="text-blue-500 text-5xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-4">Grooming & Hygiene</h3>
          <p className="text-lg mb-6">
            Keep your pet clean and healthy with the right grooming techniques. Discover tips and tricks!
          </p>
          <button
            onClick={() =>
              handleModalOpen(
                "Grooming & Hygiene: Regular grooming is essential for your pet's hygiene and comfort. Learn the best practices for different pet types, including brushing, bathing, and nail trimming."
              )
            }
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Learn More
          </button>
        </div>

        {/* Health Monitoring Card */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs w-full hover:scale-105 transform transition duration-300">
          <FaHeart className="text-blue-500 text-5xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-4">Health Monitoring</h3>
          <p className="text-lg mb-6">
            Keep track of your pet's health with regular checkups and proper medical care.
          </p>
          <button
            onClick={() =>
              handleModalOpen(
                "Health Monitoring: Regular vet checkups, vaccinations, and health monitoring are key to ensuring your pet stays happy and healthy throughout their life."
              )
            }
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Learn More
          </button>
        </div>

        {/* Training Tips Card */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs w-full hover:scale-105 transform transition duration-300">
          <FaRegCheckCircle className="text-blue-500 text-5xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-4">Training Tips</h3>
          <p className="text-lg mb-6">
            Train your pet to follow commands and behave well. Learn effective training strategies.
          </p>
          <button
            onClick={() =>
              handleModalOpen(
                "Training Tips: Positive reinforcement is the best way to train your pet. Consistent practice, patience, and rewards will help your pet learn commands and good behavior."
              )
            }
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
          onClick={handleModalClose}
        >
          <div
            className="bg-white p-8 rounded-lg w-11/12 sm:w-1/3"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-semibold mb-4">More Details</h3>
            <p className="text-lg mb-6">{modalContent}</p>
            <button
              onClick={handleModalClose}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PetCare;
