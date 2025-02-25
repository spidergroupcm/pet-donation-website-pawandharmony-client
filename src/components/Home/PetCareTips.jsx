import { useState } from "react";
import { FaDog, FaCat, FaDove, FaFish } from "react-icons/fa";

const PetCareTips = () => {
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
      <h2 className="text-3xl font-bold mb-5">Pet Care Tips</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {/* Dog Care */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs w-full hover:scale-105 transform transition duration-300">
          <FaDog className="text-blue-500 text-5xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-4">Dog Care Tips</h3>
          <button onClick={() => handleModalOpen("Provide fresh water, a balanced diet, regular exercise, and routine vet check-ups. Socialize and train your dog for better behavior.")} className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition">Learn More</button>
        </div>

        {/* Cat Care */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs w-full hover:scale-105 transform transition duration-300">
          <FaCat className="text-blue-500 text-5xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-4">Cat Care Tips</h3>
          <button onClick={() => handleModalOpen("Ensure fresh water, a nutritious diet, regular vet visits, and a clean litter box. Provide scratching posts and toys for mental stimulation.")} className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition">Learn More</button>
        </div>

        {/* Bird Care */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs w-full hover:scale-105 transform transition duration-300">
          <FaDove className="text-blue-500 text-5xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-4">Bird Care Tips</h3>
          <button onClick={() => handleModalOpen("Provide a spacious cage, fresh water, a balanced diet, and regular interaction. Clean the cage frequently and ensure proper ventilation.")} className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition">Learn More</button>
        </div>

        {/* Fish Care */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs w-full hover:scale-105 transform transition duration-300">
          <FaFish className="text-blue-500 text-5xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-4">Fish Care Tips</h3>
          <button onClick={() => handleModalOpen("Maintain clean water with a proper filtration system, regulate temperature, and feed an appropriate diet. Avoid overfeeding to keep the tank clean.")} className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition">Learn More</button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50" onClick={handleModalClose}>
          <div className="bg-white p-8 rounded-lg w-11/12 sm:w-1/3" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-semibold mb-4">Pet Care Tips</h3>
            <p className="text-lg mb-6">{modalContent}</p>
            <button onClick={handleModalClose} className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition">Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PetCareTips;
