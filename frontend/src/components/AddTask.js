import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskAsync} from '../redux/task/taskSlice';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';



const AddTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const user =useSelector((state)=>state.user.user);
  const [isFormVisible, setFormVisible] = useState(false);
  // const [taskName, setTaskName] = useState('');
  // const [taskDescription, setTaskDescription] = useState('');
  // const [taskDeadline, setTaskDeadline] = useState('');
  const dispatch = useDispatch();

  const handleAddTaskClick = () => {
    setFormVisible(true);
  };

  const handleCancel = () => {
   
    setFormVisible(false);
  };

  const handleAddTask = async(formData) => {
    const {taskName , taskDescription, taskDeadline} = formData;
    
    try {
       dispatch(addTaskAsync({ taskName, taskDescription, taskDeadline,user }));
    (addTaskAsync.fulfilled && toast.success("Task Added"))
    reset();
   
    handleCancel();
    } catch (error) {
      console.log(error)
    }
    
    
  };

  return (
    <div className='w-full mx-5 px-5 align-baseline '>
      {isFormVisible && (
        <form className="mt-4  px-5" id='form' onSubmit={handleSubmit(handleAddTask)}>
          <div className="mb-4 inline w-1/6">
            <label htmlFor="taskName" className="block px-5 text-xl font-medium text-gray-700">
              Task Name
            </label>
            <input
              type="text"
              
              {...register("taskName",{required:'A Task must have a name '})}
              className="mt-1 block w-1/8 h-[50px] rounded-xl border border-gray-300"
            />
            {errors.taskName && toast.error(errors.taskName.message)}
          </div>
          <div className="mb-4 w-3/6">
            <label htmlFor="taskDescription" className="block text-xl font-medium text-gray-700">
              Task Description
            </label>
            <input
              type="textArea"
              {...register('taskDescription',{required:'A Task must have a description'})}
              className="mt-1 w-[800px] h-[50px] rounded-xl border border-gray-300"
            />
            {errors.taskDescription && toast.error(errors.taskDescription.message)}
          </div>
          <div className="mb-4">
            <label htmlFor="taskDeadline" className="block text-xl font-medium text-gray-700">
              Deadline
            </label>
            <input
              type="date"
             {...register('taskDeadline',{required:'Deadline is required'})}
              className="mt-1 p-2 w-1/7 rounded-xl border border-gray-300"
              placeholder="Deadline"
            />
            {errors.taskDeadline && toast.error(errors.taskDeadline.message)}
          </div>
          <div className="flex space-x-2 mt-[10px] ">
            <button type="submit" className="bg-green-500 text-white h-[50px] w-[100px] rounded-xl hover:bg-green-700 shadow-xl ">
              Submit Task
            </button>
            <button type='reset' onClick={handleCancel} className="bg-red-500 text-white px-4 h-[50px] py-2 rounded-xl">
              Cancel
            </button>
          </div>
        </form>
      )}
      {!isFormVisible && (
        <button
          onClick={handleAddTaskClick}
          className="bg-green-500 text-white px-4 h-[50px] py-2 rounded-xl inline-block float-right mr-[50px] mt-[70px]  "
        >
          Add Task
        </button>
      )}
    </div>
  );
};

export default AddTask;
