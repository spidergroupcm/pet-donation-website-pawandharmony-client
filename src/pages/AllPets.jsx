import React, { useState, useEffect } from 'react';
import { FaSearch, FaPaw } from 'react-icons/fa';
import Card from './Card';
import Container from '../components/shared/Container';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { Helmet } from 'react-helmet-async';

const AllPets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [filteredPets, setFilteredPets] = useState([]);

  const { data: pets, isLoading } = useQuery({
    queryKey: ['pets'],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/pets`);
      return data.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
  });

  useEffect(() => {
    if (pets) {
      const filtered = pets.filter(
        (pet) =>
          pet.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (category === '' || pet.category === category)
      );
      setFilteredPets(filtered);
    }
  }, [pets, searchTerm, category]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <Helmet>
        <title>All Pets | Paw & Harmony</title>
      </Helmet>

      {/* Search & Filter Section */}
      <div className="flex flex-col sm:flex-row gap-6 justify-between items-center mt-2 rounded-lg bg-gradient-to-r from-amber-100 to-orange-200 p-6 ">
        {/* Search Bar */}
        <div className="relative w-full sm:w-1/3">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-600" />
          <input
            type="text"
            placeholder="Search pets by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full pl-12 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:bg-white"
          />
        </div>

        {/* Category Dropdown */}
        <div className="relative w-full sm:w-1/3">
          <FaPaw className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-600" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select select-bordered w-full pl-12 py-2 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:bg-orange-100"
          >
            <option value="">All Categories</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Rabbit">Rabbit</option>
          </select>
        </div>
      </div>

      {/* Pets Grid */}
      {filteredPets.length > 0 ? (
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {filteredPets.map((pet) => (
            <Card key={pet._id} pet={pet} />
          ))}
        </div>
      ) : (
        <p className="text-center text-orange-600 text-lg font-semibold">No pets found</p>
      )}
    </Container>
  );
};

export default AllPets;

