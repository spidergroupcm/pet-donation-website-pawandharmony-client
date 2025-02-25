import PropTypes from 'prop-types';
import { TbFidgetSpinner } from 'react-icons/tb';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';

const UpdatePetForm = ({ initialPetData, handleUpdateSubmit, loading = false }) => {
  const [petDescription, setPetDescription] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: 'Dog',
    petage: '',
    petlocation: '',
    petbreed: '',
    shortdescription: '',
    image: '', // New field for image URL
  });

  // Populate fields with initial data
  useEffect(() => {
    if (initialPetData) {
      setFormData({
        name: initialPetData.name || '',
        category: initialPetData.category || 'Dog',
        petage: initialPetData.petage || '',
        petlocation: initialPetData.petlocation || '',
        petbreed: initialPetData.petbreed || '',
        shortdescription: initialPetData.shortdescription || '',
        image: initialPetData.image || '', // Initialize image field
      });
      setPetDescription(initialPetData.description || '');
    }
  }, [initialPetData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.petage || !formData.petlocation || !formData.petbreed || !petDescription) {
      alert('Please fill in all required fields.');
      return;
    }

    // Pass updated data to parent handler
    handleUpdateSubmit({ ...formData, description: petDescription });
  };

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">Pet Name</label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="name"
                id="name"
                type="text"
                placeholder="Pet Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600">Pet Category</label>
              <select
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Rabbit">Rabbit</option>
              </select>
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="petage" className="block text-gray-600">Pet Age</label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="petage"
                id="petage"
                type="text"
                placeholder="Pet Age"
                value={formData.petage}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="petlocation" className="block text-gray-600">Pet Location</label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="petlocation"
                id="petlocation"
                type="text"
                placeholder="Pet Location"
                value={formData.petlocation}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="shortdescription" className="block text-gray-600">Short Description</label>
              <textarea
                id="shortdescription"
                name="shortdescription"
                className="w-full h-32 px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                placeholder="Write a short description here..."
                value={formData.shortdescription}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="image" className="block text-gray-600">Image URL</label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="image"
                id="image"
                type="text"
                placeholder="Pet Image URL"
                value={formData.image}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="petbreed" className="block text-gray-600">Pet Breed</label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="petbreed"
                id="petbreed"
                type="text"
                placeholder="Pet Breed"
                value={formData.petbreed}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">Detailed Information</label>
              <ReactQuill
                theme="snow"
                value={petDescription}
                onChange={setPetDescription}
                className="rounded-md border border-lime-300"
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500"
              disabled={loading}
            >
              {loading ? <TbFidgetSpinner className="animate-spin m-auto" /> : 'Update Pet'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

UpdatePetForm.propTypes = {
  initialPetData: PropTypes.object.isRequired,
  handleUpdateSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default UpdatePetForm;

