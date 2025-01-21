import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/utils/utils';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomDropdown from './CustomDropDown';
import Clock from './Clock'

const Header = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();
  const tasks = useSelector((state) => state.task.data);

  const pendingTasks = useMemo(() => tasks.filter((task) => task.status === 'pending').length, [tasks]);
  const backlogTasks = useMemo(() => tasks.filter((task) => task.status === 'backlog').length, [tasks]);

  const dropdownOptions = useMemo(() => (
    location.pathname === '/profile'
      ? [
          { value: 'Dashboard', label: 'Dashboard', className: 'text-blue-500' },
          { value: 'Logout', label: 'Logout', className: 'text-red-500' },
        ]
      : [
          { value: 'Profile', label: 'Profile', className: 'text-blue-500' },
          { value: 'Logout', label: 'Logout', className: 'text-red-500' },
        ]
  ), [location.pathname]);

  return (
    <div className="h-44 max-w-full  flex-row shadow-sm rounded-xl mx-4 shadow-black">
      <div className="mx-10 my-1 w-[450px] text-7xl inline-block">Task Manager</div>
     
      {pendingTasks > 0 && (
        <div className="mx-5 text-3xl inline-block flex-row">
          Pending:
          <div className="bg-yellow-500 flex-row inline-block rounded-full px-3 mt-3 font-semibold w-9 h-9">
            {pendingTasks}
          </div>
        </div>
      )}
      {backlogTasks > 0 && (
        <div className="mx-5 text-3xl inline-block flex-row">
          Backlog:
          <div className="bg-red-500 flex-row inline-block rounded-full px-3 mt-3 font-semibold">
            {backlogTasks}
          </div>
        </div>
      )}
      <div className="inline-block">{props.children}</div>
      {user && <CustomDropdown className="inline-block" options={dropdownOptions} />}
    </div>
  );
};

export default Header;
