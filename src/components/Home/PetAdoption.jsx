import { useState } from "react";
import { FaHandshake, FaQuestionCircle, FaRegCheckCircle } from "react-icons/fa";

const PetAdoption = () => {
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
    <section className="py-10 bg-green-100 text-center">
      <h2 className="text-3xl font-bold mb-5">The Adoption Process</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {/* Step 1: Choose Your Pet */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs w-full hover:scale-105 transform transition duration-300">
          <FaHandshake className="text-green-500 text-5xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-4">Step 1: Choose Your Pet</h3>
          <p className="text-lg mb-6">
            Browse our collection of pets and find the one that best suits your lifestyle.
          </p>
          <button
            onClick={() =>
              handleModalOpen(
                "Step 1: Choose Your Pet - Browse through various pets available for adoption. Consider their size, age, and breed to ensure compatibility with your lifestyle."
              )
            }
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition"
          >
            Get Started
          </button>
        </div>

        {/* Step 2: Complete The Form */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs w-full hover:scale-105 transform transition duration-300">
          <FaHandshake className="text-green-500 text-5xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-4">Step 2: Complete The Form</h3>
          <p className="text-lg mb-6">
            Fill out our adoption application to let us know more about you and your home environment.
          </p>
          <button
            onClick={() =>
              handleModalOpen(
                "Step 2: Complete The Form - Fill out the adoption form with details about your home, lifestyle, and readiness to adopt a pet. This helps us ensure a good match."
              )
            }
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition"
          >
            Get Started
          </button>
        </div>

        {/* Step 3: Ask Questions */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs w-full hover:scale-105 transform transition duration-300">
          <FaQuestionCircle className="text-green-500 text-5xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-4">Step 3: Ask Questions</h3>
          <p className="text-lg mb-6">
            Don't hesitate to ask any questions about your future pet and the adoption process.
          </p>
          <button
            onClick={() =>
              handleModalOpen(
                "Step 3: Ask Questions - Our team is available to answer any questions you may have regarding the adoption process, your new pet, or anything else."
              )
            }
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition"
          >
            Get Started
          </button>
        </div>

        {/* Step 4: Adoption Approval */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs w-full hover:scale-105 transform transition duration-300">
          <FaRegCheckCircle className="text-green-500 text-5xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-4">Step 4: Adoption Approval</h3>
          <p className="text-lg mb-6">
            Once approved, you can finalize the adoption process and bring your new pet home!
          </p>
          <button
            onClick={() =>
              handleModalOpen(
                "Step 4: Adoption Approval - After review, we will notify you of the adoption decision. Once approved, you can finalize the paperwork and take your pet home."
              )
            }
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition"
          >
            Get Started
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
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PetAdoption;
