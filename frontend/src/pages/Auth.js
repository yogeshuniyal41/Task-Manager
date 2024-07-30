import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center py-40 bg-gray-100 h-fit">
      <div className="relative w-full max-w-md p-8 space-y-8 bg-white rounded shadow-lg">
        <div className="flex justify-between mb-4">
          <button
            className={`py-2 px-4 font-semibold ${isLogin ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`py-2 px-4 font-semibold ${!isLogin ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>
        <div className={`relative w-full overflow-hidden transition-all duration-500 ${isLogin ? 'h-64' : 'h-96'}`}>
          <div className="absolute inset-0 flex transition-transform duration-500" style={{ transform: isLogin ? 'translateX(0%)' : 'translateX(-100%)' }}>
            <div className="w-full flex-shrink-0">
              <LoginForm />
            </div>
            <div className="w-full flex-shrink-0">
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
