import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "What is Fasthelpbd Pet Donation?",
    answer:
      "Fasthelpbd Pet Donation is a platform that connects pet lovers with animals in need. You can adopt, donate, or provide foster care for pets looking for a loving home.",
  },
  {
    question: "How does the pet donation process work?",
    answer:
      "You can browse available pets, fill out an adoption request, and get connected with the pet’s current owner or shelter. If you want to donate a pet, you can list their details, and we’ll help find a suitable home.",
  },
  {
    question: "Do I need to pay any fees to adopt a pet?",
    answer:
      "Most adoptions are free, but some pets may have a small adoption fee to cover vaccinations, medical care, or shelter expenses.",
  },
  {
    question: "Can I donate money instead of a pet?",
    answer:
      "Yes! You can support animal shelters and rescues by making a donation through our platform. Your contributions help provide food, medical care, and shelter for homeless pets.",
  },
  {
    question: "What are the requirements to adopt a pet?",
    answer:
      "You must be 18 or older, provide a safe environment, and agree to a basic screening process to ensure the pet’s well-being.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg shadow-md"
          >
            <button
              className="flex justify-between items-center w-full text-left font-semibold text-lg text-gray-800"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? <FaMinus /> : <FaPlus />}
            </button>
            {openIndex === index && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-gray-600"
              >
                {faq.answer}
              </motion.p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
