import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRefreshToken } from '../redux/utils/utils';
import { logoutAsync  } from '../redux/user/UserSlice';

import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/task/taskSlice';


const Header = (props) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  
  

 

  const handleLogout =async (event) => {
    // Handle logout functionality here
    // For example: dispatch a logout action or clear user session
    event.preventDefault();
     
      let token=getRefreshToken();
    const resultAction= await dispatch(logoutAsync({'token':token}));
    
    if(logoutAsync.fulfilled.match(resultAction))
      {
        dispatch(logout())
          navigate('/');
      }
   
  };

  return (
    <div className="h-50 ml-4 mr-4 bg-transparent hover:transparent rounded-xl">
      <div className=''>
        <div className='mx-5 mt-15 w-[450px] text-7xl  inline-block '>Task Manager</div>
        <div className='mx-5 text-3xl inline-block '>Total Tasks</div>
        <div className='inline-block' >{props.children}</div>
        
        
          {user && (
            <button className=" top-full bg-transparent text-red-400 px-3 py-1 float-right rounded-lg mt-1 transition-all duration-1000 text-3xl" onClick={handleLogout}>
              Logout
            </button>
          )}
       
      </div>
      
    </div>
  );
};

export default Header;
