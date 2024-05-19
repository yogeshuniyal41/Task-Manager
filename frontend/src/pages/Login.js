import React from 'react';
import { Auth } from '../components/Auth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAsync } from '../redux/user/UserSlice';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    // Retrieve email and password from form data
    const { user, password } = formData;

    // Dispatch the login action with the email and password
    try {
      
      const resultAction = await dispatch(loginAsync({ user, password }));
      if (loginAsync.fulfilled.match(resultAction)) {
        // Login was successful, navigate to a different page
        navigate('/dashboard');
        // Show success notification
        toast.success('Login successful!');
      } else {
        // Handle login failure
        // Show error notification
        toast.error('Login failed. Please check your email and password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Show error notification
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <Auth />

      <div className="w-[328px] h-[22px] mt-[150px] ml-[660px] opacity-60 font-openSans  text-3xl leading-22 tracking-tighter text-center text-black absolute">
        Enter Credentials to Login
      </div>
      <input
        className="w-[450px] h-[54px] mt-[516px] ml-[639px] rounded border border-gray-300 absolute z-10"
        placeholder="User ID"
        type="email"
        {...register('user', { required: 'E-mail is required' })}
      />
      {errors.email && <div>{errors.user.message}</div>}
      <input
        className="w-[450px] h-[54px] mt-[604px] ml-[639px] rounded border border-gray-300 absolute z-10"
        type="password"
        placeholder="Password"
        {...register('password', { required: 'Password is required' })}
      />
      {errors.password && <div>{errors.password.message}</div>}
      <div className="w-[20px] h-[14.29px] mt-[624px] ml-[1049px] absolute text-black">Show</div>
      <div
        className="w-[450px] h-[54px] mt-[734px] ml-[639px] absolute bg-blue-500 text-white text-center pt-[25px] font-openSans"
        onClick={handleSubmit(handleLogin)}
      >
        Sign In
      </div>
      <div className="w-[57px] h-[18px] mt-[832px] ml-[839px] absolute z-10">
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};
