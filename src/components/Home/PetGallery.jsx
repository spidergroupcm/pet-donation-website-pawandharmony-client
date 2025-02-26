import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const PetGallery = ({ pets }) => {
  return (
    <section className="p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Our Beloved Pets</h2>
      {pets.map((pet, index) => (
        <div key={index} className="mb-5">
          
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            className="w-full"
          >
            {pet.images.map((image, idx) => (
              <SwiperSlide key={idx}>
                <div className="overflow-hidden rounded-xl shadow-lg bg-white">
                  <img
                    src={image}
                    alt={pet.category}
                    className="w-full h-56 object-cover transform transition duration-300 hover:scale-105"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </section>
  );
};

export default PetGallery;
