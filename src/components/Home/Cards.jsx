import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cards = () => {
    const [pets, setPets] = useState([]);
    const [visiblePets, setVisiblePets] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios(`${import.meta.env.VITE_API_URL}/pets`);
                const shuffledPets = response.data.sort(() => 0.5 - Math.random());
                setPets(shuffledPets);
                setVisiblePets(shuffledPets.slice(0, 4));
            } catch (error) {
                console.error('Error fetching pets:', error);
            }
        };
        fetchPets();
    }, []);

    const handleSeeMore = async (id) => {
        try {
            const response = await axios(`${import.meta.env.VITE_API_URL}/pets/${id}`);
            setSelectedPet(response.data);
        } catch (error) {
            console.error('Error fetching pet details:', error);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {visiblePets.map(pet => (
                    <div key={pet._id} className="border p-4 rounded shadow">
                        <img src={pet.image} alt={pet.name} className="w-full h-40 object-cover rounded" />
                        <h3 className="text-lg font-semibold mt-2">{pet.name}</h3>
                        <button 
                            onClick={() => handleSeeMore(pet._id)} 
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                            See More
                        </button>
                    </div>
                ))}
            </div>
            {selectedPet && (
                <div className="mt-4 p-4 border rounded shadow-lg">
                    <h2 className="text-xl font-bold">{selectedPet.name}</h2>
                    <img src={selectedPet.image} alt={selectedPet.name} className="w-full h-60 object-cover rounded mt-2" />
                    <p className="mt-2">{selectedPet.description}</p>
                </div>
            )}
        </div>
    );
};

export default Cards;


