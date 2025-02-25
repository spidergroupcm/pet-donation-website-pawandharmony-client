import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import banner1 from "../assets/banner-img/banner1.png";

const Home = () => {
  const [pets, setPets] = useState([]);

  // Fetch pet images
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/pets`);
        // Randomly select 4 pets
        const shuffledPets = data.sort(() => 0.5 - Math.random());
        setPets(shuffledPets.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch pets", error);
      }
    };
    fetchPets();
  }, []);

  return (
    <>
      {/* Banner Section */}
      <div className="relative w-full h-[550px]">
        <Helmet>
          <title>Home | Paw & Harmony</title>
        </Helmet>
        {/* Background Image */}
        <img src={banner1} alt="Happy Pets" className="w-full h-full object-cover" />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        {/* Banner Content */}
        <div className="absolute inset-0 flex flex-col items-center text-center text-white px-4 justify-end pb-10">
          <p className="text-lg md:text-2xl mb-4">
            Your trusted companion for all pet care needs.
          </p>
         
        </div>
      </div>

      {/* Pet Gallery Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Lovely Pets</h2>
        <p className="text-lg mb-6 max-w-3xl mx-auto">
          Discover our adorable pets available for adoption. Find your perfect furry companion today!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="relative bg-white shadow-md rounded-lg overflow-hidden group"
            >
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-bold text-white">{pet.name}</h3>
              </div>
            </div>
          ))}
        </div>
        <a
          href="/pet-listing"
          className="block mt-8 bg-yellow-400 text-black px-8 py-4 rounded-lg font-medium hover:bg-yellow-500 transition"
        >
          See All Pets
        </a>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-yellow-100 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Adopt a Pet, Change a Life</h2>
        <p className="text-lg mb-6 max-w-3xl mx-auto">
          Every pet deserves a loving home. Adopt today and give them the life they deserve while filling your home with unconditional love.
        </p>
        <a
          href="/adopt"
          className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-medium hover:bg-yellow-500 transition"
        >
          Start Your Journey
        </a>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">About Us</h2>
        <p className="text-lg max-w-4xl mx-auto">
          Our mission is to connect loving families with pets in need. Through this platform, we aim to simplify the adoption process and provide resources to help you care for your furry friends.
        </p>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Happy Tails</h2>
        <p className="text-lg max-w-4xl mx-auto mb-6">
          Hear from our adopters about the joy and love their new pets have brought into their lives.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                "Adopting Max was the best decision we ever made! He's brought so much happiness into our home."
              </p>
              <p className="text-yellow-600 font-bold">- A Happy Adopter</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;

