import React, { useEffect, useMemo } from 'react';
import CircularProgressBar from '../components/CircularProgressBar';
import Header from '../components/Header';
import Clock from '../components/Clock'
import { getUser, getName } from '../redux/utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTaskAsync } from '../redux/task/taskSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = getUser();
  const name = getName();
  const tasks = useSelector((state) => state.task.data);

  useEffect(() => {
    if(!user){
      navigate('/')
    }
    else
    dispatch(fetchAllTaskAsync(user));
  }, []);

  const pendingTasks = useMemo(() => tasks.filter((task) => task.status === 'pending').length, [tasks]);
  const backlogTasks = useMemo(() => tasks.filter((task) => task.status === 'backlog').length, [tasks]);
  const completedTasks = useMemo(() => tasks.filter((task) => task.status === 'complete').length, [tasks]);

  return (
    <div className=" min-h-screen bg-[url('/public/new.jpg')] bg-fixed ">
     <Header><div className='mx-5 text-5xl hover:text-blue-400'><Clock/></div></Header>
      <div className="flex flex-row flex-shrink p-5">
        <h1 className="px-5  font-bold text-2xl">User Name :{name}</h1>
        <h1 className="px-5  font-bold text-2xl">Email Id : {user}</h1>
      </div>

      <div className="flex">
        <CircularProgressBar
          endValue={tasks.length > 0 ? Math.round(backlogTasks * 100 / tasks.length) : 0}
          colour="text-red-500"
          text="Backlogs"
        />
        <CircularProgressBar
          endValue={tasks.length > 0 ? Math.round(pendingTasks * 100 / tasks.length) : 0}
          colour="text-yellow-500"
          text="Pending"
        />
        <CircularProgressBar
          endValue={tasks.length > 0 ? Math.round(completedTasks * 100 / tasks.length) : 0}
          colour="text-green-500"
          text="Completed"
        />
      </div>
    </div>
  );
};

export default Profile;
