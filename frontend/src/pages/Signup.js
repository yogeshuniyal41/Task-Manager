import React from 'react';
import { Auth } from '../components/Auth';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { signupAsync } from '../redux/user/UserSlice';
import { toast } from 'react-toastify';

export const Signup = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const Error = useSelector((state)=>state.user.error)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const password = React.useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data) => {
    const { name, user, password } = data;

    try {
      const resultAction = await dispatch(signupAsync({ name, user, password }));
      if (signupAsync.fulfilled.match(resultAction)) {
        navigate('/');
        toast.success('Signup successful!');
      } else {
        toast.error('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="relative">
      <Auth >
      <div className="absolute top-[520px] left-0 w-full h-full flex flex-col items-center  justify-center z-10 ">
        <p className='text-red-500' >{Error}</p>
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className=" p-6 rounded-lg  w-full max-w-md"
        >
          <div className="mb-4 z-10 ">
            <input
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('name', { required: 'Name is required' })}
              placeholder="Name"
            />
            {errors.name && <div className="text-red-500 mt-1">{errors.name.message}</div>}
          </div>

          <div className="mb-4">
            <input
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('user', { required: 'Mail ID is required' })}
              placeholder="Mail ID"
            />
            {errors.user && <div className="text-red-500 mt-1">{errors.user.message}</div>}
          </div>

          <div className="mb-4">
            <input
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: "Password must have at least 6 characters"
                }
              })}
              type="password"
              placeholder="Password"
            />
            {errors.password && <div className="text-red-500 mt-1">{errors.password.message}</div>}
          </div>

          <div className="mb-4">
            <input
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('confirmPassword', {
                validate: value => value === password.current || "The passwords do not match"
              })}
              type="password"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && <div className="text-red-500 mt-1">{errors.confirmPassword.message}</div>}
          </div>

          <button className="w-full h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600" type="submit">
            Sign Up
          </button>

          <div className="mt-4">
            <Link to="/" className="text-blue-500 hover:text-blue-600">Already a Member?</Link>
          </div>
        </form>
      </div>
      </Auth>
    </div>
  );
};

export default Signup;
