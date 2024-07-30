import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupAsync } from '../redux/user/UserSlice';
import { toast } from 'react-toastify';

const SignupForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    const { user, password, name } = formData;

    try {
      const resultAction = await dispatch(signupAsync({ user, name, password }));
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
    <form className="space-y-4 text-center h-full" onSubmit={handleSubmit(handleSignup)}>
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input type="text" id="username" className="w-full px-3 py-2 mt-1 border rounded-md" {...register('name', { required: 'Username is required' })} />
        {errors.name && <div className="text-red-500 text-sm">{errors.name.message}</div>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" className="w-full px-3 py-2 mt-1 border rounded-md" {...register('user', { required: 'Email is required' })} />
        {errors.user && <div className="text-red-500 text-sm">{errors.user.message}</div>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" className="w-full px-3 py-2 mt-1 border rounded-md" {...register('password', { required: 'Password is required' })} />
        {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input type="password" id="confirmPassword" className="w-full px-3 py-2 mt-1 border rounded-md" {...register('confirmPassword', {
          required: 'Confirm Password is required',
          validate: value => value === watch('password') || 'Passwords do not match'
        })} />
        {errors.confirmPassword && <div className="text-red-500 text-sm">{errors.confirmPassword.message}</div>}
      </div>
      <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded-md">Signup</button>
    </form>
  );
};

export default SignupForm;
