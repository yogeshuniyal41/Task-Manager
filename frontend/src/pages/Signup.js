import React from 'react';
import { Auth } from '../components/Auth';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { signupAsync } from '../redux/user/UserSlice';
import { toast } from 'react-toastify';

export const Signup = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Error = useSelector(state => state.user.error);

  const password = React.useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data) => {
    const { name, user, password } = data;

    try {
      const resultAction = await dispatch(signupAsync({ name, user, password }));
      if (signupAsync.fulfilled.match(resultAction)) {
        // Signup was successful, navigate to a different page
        navigate('/');
        toast.success('Signup successful!');
      } else {
        // Handle signup failure
        toast.error('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    
      <Auth>
      <form  onSubmit={handleSubmit(onSubmit)}>
        
        <input className='className="w-[500px] h-[54px] mt-[256px] ml-[639px] rounded border border-gray-300 absolute z-10' {...register('name', { required: 'Name is required' })} placeholder="Name" />
        {errors.name && <div>{errors.name.message}</div>}
        <input className="w-[450px] h-[54px] mt-[346px] ml-[639px] rounded border border-gray-300 absolute z-10" {...register('user', { required: 'Mail ID is required' })} placeholder="Mail ID" />
        {errors.user && <div>{errors.user.message}</div>}
        <input className="w-[450px] h-[54px] mt-[446px] ml-[639px] rounded border border-gray-300 absolute z-10" {...register('password', { 
          required: 'Password is required',
          minLength: {
            value: 6,
            message: "Password must have at least 6 characters"
          }
        })} type="password" placeholder="Password" />
        {errors.password && <div>{errors.password.message}</div>}
        <input className="w-[450px] h-[54px] mt-[546px] ml-[639px] rounded border border-gray-300 absolute z-10" {...register('confirmPassword', { 
          validate: value => value === password.current || "The passwords do not match" 
        })} type="password" placeholder="Confirm Password" />
        {errors.confirmPassword && <div>{errors.confirmPassword.message}</div>}
        <button className="w-[450px] h-[54px] mt-[604px] ml-[639px] rounded border bg-blue-500 font-sans border-gray-300 absolute z-10" type="submit">Sign Up</button>
        <div>
          <Link to="/">Already a Member?</Link>
        </div>
      </form>
      </Auth>
   
    
  );
};
