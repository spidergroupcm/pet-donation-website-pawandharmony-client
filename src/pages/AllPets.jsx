import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from './Card';
import Container from '../components/shared/Container';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { Helmet } from 'react-helmet-async';

const AllPets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [visiblePets, setVisiblePets] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 12; // Number of items to load per scroll
  const [filteredPets, setFilteredPets] = useState([]); // Store filtered data separately

  const { data: pets, isLoading } = useQuery({
    queryKey: ['pets'],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/pets`);
      return data.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending
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
      setVisiblePets(filtered.slice(0, itemsPerPage));
      setHasMore(filtered.length > itemsPerPage); // Check if more items are available
    }
  }, [pets, searchTerm, category]);

  const fetchMoreData = () => {
    if (visiblePets.length >= filteredPets.length) {
      setHasMore(false);
      return;
    }
    const nextPage = visiblePets.length + itemsPerPage;
    setVisiblePets((prev) => [
      ...prev,
      ...filteredPets.slice(prev.length, nextPage),
    ]);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <Helmet>
        <title>All Pets | Paw & Harmony</title>
      </Helmet>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full sm:w-1/3 mt-5"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full sm:w-1/3 mt-5"
        >
          <option value="">All Categories</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
          <option value="Rabbit">Rabbit</option>
        </select>
      </div>

      {visiblePets.length > 0 ? (
        <InfiniteScroll
          dataLength={visiblePets.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<LoadingSpinner />}
        
        >
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8">
            {visiblePets.map((pet) => (
              <Card key={pet._id} pet={pet} />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <p>No Data Available</p>
      )}
    </Container>
  );
};

export default AllPets;

