import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAsync } from '../redux/user/UserSlice';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    const { user, password } = formData;

    try {
      const resultAction = await dispatch(loginAsync({ user, password }));
      if (loginAsync.fulfilled.match(resultAction)) {
        navigate('/dashboard');
        
        toast.success('Login successful!');
      } else {
        toast.error('Login failed. Please check your email and password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <form className="space-y-6 text-center" onSubmit={handleSubmit(handleLogin)}>
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
      <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded-md">Login</button>
    </form>
  );
};

export default LoginForm;
