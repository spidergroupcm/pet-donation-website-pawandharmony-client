import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import loginimg from '../../assets/login-img/login.png';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const { signIn, signInWithGoogle, signInWithGitHub, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';

  if (user) return <Navigate to={from} replace={true} />;
  if (loading) return <LoadingSpinner />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
      toast.success('Login Successful');
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
      toast.success('Login Successful with Google');
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      await signInWithGitHub();
      navigate(from, { replace: true });
      toast.success('Login Successful with GitHub');
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="flex max-w-5xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:block w-1/2">
          <img src={loginimg} alt="Login Illustration" className="object-cover w-full h-full" />
        </div>
        <div className="flex flex-col justify-center w-full md:w-1/2 p-6">
          <h1 className="my-3 text-4xl font-bold text-center">Log In</h1>
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm mb-2">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              />
            </div>
            <button
              type="submit"
              className="bg-lime-500 w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                'Login'
              )}
            </button>
          </form>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px bg-gray-300"></div>
            <p className="px-3 text-sm text-gray-400">Login with social accounts</p>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
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

          <p className="px-6 text-sm text-center text-gray-400">
            Dont have an account?{' '}
            <Link
              to="/signup"
              className="hover:underline hover:text-lime-500 text-gray-600"
            >
              Register Now
            </Link>
            .
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;


