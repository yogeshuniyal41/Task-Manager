import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTaskAsync } from '../redux/task/taskSlice';
import Header from '../components/Header';
import Clock from '../components/Clock';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';

const Dashboard = () => {
    
    const dispatch = useDispatch();
    const userId= useSelector((state)=>state.user.user)

    useEffect(() => {
        // Fetch tasks when the Dashboard component mounts
        dispatch(fetchAllTaskAsync(userId));
    }, []);

    return (
        userId &&  <div className=" bg-cover bg-no-repeat bg-center h-screen" style={{backgroundImage: `url('./bg.jpg')`}}>
            <Header>
                <div className='mx-5 text-5xl  hover:bg-purple-50'><Clock/></div>
                
            </Header>
            <AddTask/>
            <TaskList/>
        </div>
    );
};

export default Dashboard;
