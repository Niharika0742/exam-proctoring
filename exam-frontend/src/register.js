import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', data);
      toast.success(response.data.msg);
      setTimeout(() => {
        if (data.role === 'admin') {
          navigate('/adminlogin');
        } else {
          navigate('/assignment');
        }
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div>
      <form className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4 mt-20" onSubmit={handleSubmit(handleRegister)}>
        <h1 className="text-center">Register</h1>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <input {...register("username", { required: true })} type="text" className="grow" placeholder="Username" />
          </label>
          {errors.username && <span>Username is required</span>}
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <input {...register("email", { required: true })} type="email" className="grow" placeholder="Email" />
          </label>
          {errors.email && <span>Email is required</span>}
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <input {...register("phoneNumber", { required: true })} type="text" className="grow" placeholder="Phone Number" />
          </label>
          {errors.phoneNumber && <span>Phone Number is required</span>}
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <input {...register("password", { required: true })} type="password" placeholder="Password" className="grow" />
          </label>
          {errors.password && <span>Password is required</span>}
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <input {...register("preferredName")} type="text" className="grow" placeholder="Preferred Name (Optional)" />
          </label>
        </div>
        <div className="flex items-center gap-4">
          <span>Role:</span>
          <label className="flex items-center gap-2">
            <input {...register("role", { required: true })} type="radio" value="student" />
            Student
          </label>
          <label className="flex items-center gap-2">
            <input {...register("role", { required: true })} type="radio" value="admin" />
            Admin
          </label>
        </div>
          {errors.role && <span>Role is required</span>}
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-900">
          Register
        </button>
        <button type="button" onClick={() =>navigate('/')}>Login?</button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Register;
