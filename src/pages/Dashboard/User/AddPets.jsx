import { Helmet } from 'react-helmet-async';
import AddPetForm from '../../../components/Form/AddPetForm';
import { imageUpload } from '../../../api/utils';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const AddPets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [uploadImage, setUploadImage] = useState({
    image: { name: 'Upload Button' },
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e, petDescription, clearForm) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const category = form.category.value;
    const petlocation = form.petlocation.value;
    const petage = form.petage.value;
    const petbreed = form.petbreed.value;
    const shortdescription = form.shortdescription.value;

    const image = form.image.files[0];
    const imageUrl = await imageUpload(image);

    const userData = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    const petData = {
      name,
      category,
      description: petDescription,
      image: imageUrl,
      userData,
      petage,
      petlocation,
      petbreed,
      shortdescription,
      adopted: false,
    };

    try {
      await axiosSecure.post('/pets', petData);
      toast.success('Pet added successfully!');
      clearForm(e); // Clear the form after successful submission
    } catch (err) {
      console.error(err);
      toast.error('Failed to add pet!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Add Pet | Dashboard</title>
      </Helmet>
      <AddPetForm
        handleSubmit={handleSubmit}
        uploadImage={uploadImage}
        setUploadImage={setUploadImage}
        loading={loading}
      />
    </div>
  );
};

export default AddPets;


