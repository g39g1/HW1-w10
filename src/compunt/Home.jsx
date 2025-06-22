import { Link } from 'react-router';

const Home = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500 text-white p-4">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-teal-600 rounded-full opacity-30 top-[-120px] left-[-120px]"></div>
        <div className="absolute w-80 h-80 bg-blue-700 rounded-full opacity-20 top-[150px] right-[-100px]"></div>
        <div className="absolute w-72 h-72 bg-teal-800 rounded-full opacity-25 bottom-[-180px] left-[-80px]"></div>
        <div className="absolute w-60 h-80 bg-blue-900 rounded-full opacity-25 bottom-[-120px] right-[-60px]"></div>
      </div>

      <div className="text-center relative z-10 p-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-wide">
          Welcome to the Weather Data Dashboard
        </h1>

        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
          We provide you with an easy and fast way to access various weather data. Stay informed with the latest updates wherever you are!
        </p>

        <div className="flex justify-center space-x-6 mt-6">
          <Link to="/Singin">
            <button className="bg-white text-teal-800 px-8 py-4 md:px-10 md:py-5 rounded-lg font-semibold transition duration-300 hover:bg-teal-100 shadow-lg">
              Log In
            </button>
          </Link>
          <Link to="/Singup">
            <button className="bg-teal-500 text-white px-8 py-4 md:px-10 md:py-5 rounded-lg font-semibold transition duration-300 hover:bg-teal-600 shadow-lg">
              Create New Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
