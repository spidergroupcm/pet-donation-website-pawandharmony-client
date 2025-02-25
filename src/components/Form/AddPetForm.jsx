import PropTypes from 'prop-types';
import { TbFidgetSpinner } from 'react-icons/tb';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';


const AddPetForm = ({ handleSubmit, uploadImage, setUploadImage, loading }) => {
  const [petDescription, setPetDescription] = useState('');

  const onSubmit = (e) => {
    handleSubmit(e, petDescription); // Pass petDescription to handleSubmit
    e.target.reset(); // Clear the form
    setPetDescription(''); // Clear ReactQuill content
    setUploadImage({ image: { name: 'Upload Button' } }); 
    // toast.success('Form submitted successfully!'); 
  };

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Pet Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="name"
                id="name"
                type="text"
                placeholder="Pet Name"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600">
                Pet Category
              </label>
              <select
                required
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="category"
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Rabbit">Rabbit</option>
              </select>
            </div>

            {/* Age */}
            <div className="space-y-1 text-sm">
              <label htmlFor="petage" className="block text-gray-600">
                Pet Age
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="petage"
                id="petage"
                type="text"
                placeholder="Pet Age"
                required
              />
            </div>

            {/* Location */}
            <div className="space-y-1 text-sm">
              <label htmlFor="petlocation" className="block text-gray-600">
                Pet Location
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="petlocation"
                id="petlocation"
                type="text"
                placeholder="Pet Location"
                required
              />
            </div>

            {/* Short Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="shortdescription" className="block text-gray-600">
                Short Description
              </label>
              <textarea
                id="shortdescription"
                name="shortdescription"
                className="w-full h-32 px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                placeholder="Write detailed information about the pet here..."
                required
              ></textarea>
            </div>
          </div>

          <div className="space-y-6 flex flex-col">
            {/* Breed */}
            <div className="space-y-1 text-sm">
              <label htmlFor="petbreed" className="block text-gray-600">
                Pet Breed
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="petbreed"
                id="petbreed"
                type="text"
                placeholder="Pet Breed"
                required
              />
            </div>

            {/* Detailed Information */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Detailed Information
              </label>
              <ReactQuill
                theme="snow"
                value={petDescription}
                onChange={setPetDescription}
                className="rounded-md border border-lime-300"
              />
            </div>

            {/* Image */}
            <div className="p-4 w-full m-auto rounded-lg flex-grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      onChange={(e) =>
                        setUploadImage({
                          image: e.target.files[0],
                          url: URL.createObjectURL(e.target.files[0]),
                        })
                      }
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500">
                      {uploadImage?.image?.name}
                    </div>
                  </label>
                </div>
              </div>
            </div>
            {uploadImage?.image?.size && (
              <div className="flex gap-5 items-center">
                <img className="w-20" src={uploadImage?.url} alt="" />
                <p>Image Size: {uploadImage?.image?.size} Bytes</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

AddPetForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setUploadImage: PropTypes.func.isRequired,
  uploadImage: PropTypes.object,
  loading: PropTypes.bool,
};

export default AddPetForm;

