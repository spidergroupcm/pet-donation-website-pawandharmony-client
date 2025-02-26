import { Helmet } from "react-helmet-async";
import banner1 from "../assets/banner-img/banner1.png";
import PetAdoption from "../components/Home/PetAdoption";
import PetCareTips from "../components/Home/PetCareTips";
import PetCare from "../components/Home/PetCare";
import Faq from "../components/Home/Faq";
import PetGallery from "../components/Home/PetGallery";

const Home = () => {


  const pets = [
    {
      
      images: [
        "https://i.ibb.co/6cKTK4b/persian.png",
        "https://i.ibb.co/x6rpcwn/maine-coon.png",
        "https://i.ibb.co/n030zcb/siamese.png",
        "https://i.ibb.co/r3TVP2b/scottish-fold.png",
        "https://i.ibb.co/rfQdXDr/golden-retriever.png",
        "https://i.ibb.co/N3MZz3C/labrador-retriever.png",
        "https://i.ibb.co/drzBWX8/african-grey-parrot.png",
        "https://i.ibb.co/RNTDk5Q/canary.png",
        "https://i.ibb.co/XYcPQs6/cockatiel.png",
      ],
    },
  
  ];


  return (
    <>

            {/* Banner Section */}

            <div className="relative w-full">
            <Helmet>
            <title>Home | Paw & Harmony</title>
            </Helmet>
            {/* Background Image */}
            <img
            src={banner1}
            alt="Happy Pets"
            className="w-full h-[500px] object-cover brightness-75"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
            {/* Banner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Your Trusted Companion <br className="hidden md:block" /> for All Pet Care Needs
            </h1>
            <p className="mt-4 text-lg md:text-2xl lg:text-3xl font-medium text-gray-200 max-w-2xl drop-shadow">
            Discover love, joy, and companionship with our pet adoption services.
            </p>
            <a
            href="/pet-listing"
            className="mt-5 bg-green-500 text-black px-6 py-3 md:px-10 md:py-4 rounded-lg font-semibold text-lg text-center shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-105"
            >
            Start Your Journey
            </a>
            </div>
            </div>



        <PetGallery pets={pets} />


        <div className="flex justify-center items-center px-10  bg-gray-100">
        <div className="w-full text-center">
        <a
        href="/pet-listing"
        className="block bg-green-500 text-white mb-3 px-8 py-4 rounded-2xl text-xl font-semibold shadow-lg hover:bg-green-700"
        >
        See All Pets
        </a>
        </div>
        </div>


        
       
      <PetAdoption></PetAdoption>
      <PetCareTips></PetCareTips>
      <PetCare></PetCare>
      <Faq></Faq>


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

