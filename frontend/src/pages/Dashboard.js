import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllTaskAsync } from '../redux/task/taskSlice';
import Header from '../components/Header';
import Clock from '../components/Clock';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';
import { getUser } from '../redux/utils/utils';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const dispatch = useDispatch();
    const userId = getUser();
    const navigate = useNavigate();

    useEffect(() => {
        // Navigate to home if userId is not present
        if (!userId) {
            navigate('/');
        } else {
            // Fetch tasks when the Dashboard component mounts
            dispatch(fetchAllTaskAsync(userId));
        }
    }, [userId, dispatch, navigate]);

    // Return null or a loader while navigating
    if (!userId) {
        return null;
    }

    return (
        <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-500 min-h-screen">
            <Header>
                <div className='mx-5 text-5xl hover:text-blue-400'><Clock/></div>
            </Header>
            <AddTask />
            <TaskList />
        </div>
    );
};

export default Dashboard;
