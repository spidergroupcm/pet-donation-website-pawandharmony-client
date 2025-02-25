import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import { imageUpload } from '../../api/utils';
import signupimg from '../../assets/register-img/register.png';

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, signInWithGitHub, loading } = useAuth();
  const navigate = useNavigate();

  // Form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    try {
      // Upload image to a server (e.g., imgbb or other service)
      const photoURL = await imageUpload(image);

      // Register user
      const result = await createUser(email, password);

      // Update user profile with name and image
      await updateUserProfile(name, photoURL);
      console.log(result);

      navigate('/');
      toast.success('Signup Successful');
    } catch (err) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
      toast.success('Signup Successful with Google');
    } catch (err) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  // Handle GitHub Sign-In
  const handleGitHubSignIn = async () => {
    try {
      await signInWithGitHub();
      navigate('/');
      toast.success('Signup Successful with GitHub');
    } catch (err) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex flex-wrap min-h-screen">
      {/* Left Section: Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-white">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900 shadow-md">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign Up Now</h1>
            <p className="text-sm text-gray-400">Welcome to Paw & Harmony</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Your Name Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                  required
                />
              </div>
              <div>
                <label htmlFor="image" className="block mb-2 text-sm">
                  Select Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*******"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-lime-500 w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                'Continue'
              )}
            </button>
          </form>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
            <p className="px-3 text-sm text-gray-400">
              Signup with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
          </div>
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <div
              onClick={handleGoogleSignIn}
              className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 rounded cursor-pointer"
            >
              <FcGoogle size={32} />
              <p>Continue with Google</p>
            </div>
            <div
              onClick={handleGitHubSignIn}
              className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 rounded cursor-pointer"
            >
              <FaGithub size={32} />
              <p>Continue with GitHub</p>
            </div>
          </div>
          <p className="px-6 text-sm text-center text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="hover:underline hover:text-lime-500 text-gray-600"
            >
              Login
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Right Section: Background Image */}
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${signupimg})` }}
      ></div>
    </div>
  );
};

export default SignUp;

