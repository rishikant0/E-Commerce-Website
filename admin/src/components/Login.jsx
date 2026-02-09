import React, { useState } from 'react'
import axios from 'axios';
import { backendUrl } from '../App.jsx';
import { toast } from 'react-toastify';
const Login = ({setToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/admin`,
      { email, password }
    );
    if(response.data.success){
      setToken(response.data.token);
    }else{
        toast.error(response.data.message);
    }
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
  }
};

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Page</h1>

        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className='text-sm font-medium text-gray-700 mb-2'>
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              className="
                w-full px-4 py-2 border border-gray-300 rounded-md
                outline-none text-gray-700 placeholder-gray-400
                focus:border-black focus:ring-1 focus:ring-black
                transition duration-200
              "
            />
          </div>

          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Password
            </p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              className="
                w-full px-4 py-2 border border-gray-300 rounded-md
                outline-none text-gray-700 placeholder-gray-400
                focus:border-black focus:ring-1 focus:ring-black
                transition duration-200
              "
            />
          </div>

          <div className='bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200 text-center cursor-pointer'>
            <button type='submit'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
