import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router'; 
import { Link } from 'react-router'; 

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;
    if (!email || !password || !username || !confirmPassword) {
      isValid = false;
      Swal.fire({
        title: 'Error!',
        text: 'All fields are required',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
    if (password !== confirmPassword) {
      isValid = false;
      Swal.fire({
        title: 'Error!',
        text: 'Passwords do not match',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true); 
      try {
        const response = await axios.post('https://project-w9.onrender.com/auth/signup', {
          email,
          password,
          username,
        });

        if (response.data && response.data.token) {
          Swal.fire({
            title: 'Success!',
            text: 'Registration successful!',
            icon: 'success',
            confirmButtonText: 'Okay',
          });

          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('token', response.data.token); 

          navigate('/Singin');
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Token not found in response',
            icon: 'error',
            confirmButtonText: 'Okay',
          });
        }
      } catch (error) {
        console.error(error);
        const errorMessage = error.response ? error.response.data.message : 'Something went wrong';

        Swal.fire({
          title: 'Error!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Okay',
        });
      } finally {
        setIsLoading(false); 
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Create Your Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? <div className="loader">Loading...</div> : 'Create Account'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/Singin" className="text-teal-500 hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
