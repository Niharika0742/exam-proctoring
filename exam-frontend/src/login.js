import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', data);
      toast.success(response.data.msg); // Make sure response.data.msg exists
      setTimeout(() => {
        if (response.data.role === 'admin') {
          navigate('/adminlogin');
        } else {
          navigate('/assignment');
        }
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.msg || 'An error occurred'); // Make sure error.response.data.msg exists
    }
  };

  return (
    <div>
      <ToastContainer /> {/* Make sure this is placed correctly in your component */}
      <form className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4 mt-20" onSubmit={handleSubmit(handleLogin)}>
        <h1 className="text-center">Exam Login</h1>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <input {...register("username", { required: true })} type="text" className="grow" placeholder="Username" />
          </label>
          {errors.username && <span>Username is required</span>}
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <input {...register("password", { required: true })} type="password" placeholder="Password" className="grow" />
          </label>
          {errors.password && <span>Password is required</span>}
        </div>
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-900">
          Login
        </button>
        <button type="button" onClick={() => navigate('/register')}>New user?</button>
      </form>
    </div>
  );
};

export default Login;
