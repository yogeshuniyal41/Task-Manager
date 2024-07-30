import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllTasks, updateTask, addTask, deleteTask, updateBody } from './taskapi';


// Assume you have a Redux state with user details


const initialState = {
    data: [],
    status: 'idle',
    error: null,
};

// Define the thunk for fetching all tasks with the user ID
export const fetchAllTaskAsync = createAsyncThunk(
    'tasks/fetchAll',
    async (userId) => {
        
        const data = await fetchAllTasks(userId);
        
        return data;
    }
);

// Define the thunk for adding a task with the user ID
export const addTaskAsync = createAsyncThunk(
    'tasks/addTask',
    async (task) => {
        
       try {
        const data = await addTask(task);
        return data;
       } catch (error) {
        return error;
       }
    }
);

// Define the thunk for updating a task with the user ID
export const updateTaskAsync = createAsyncThunk(
    'tasks/updateTask',
    async ({ taskIds, status }) => {
        
        
        try {
            const data = await updateTask(taskIds, status);
        return data
    }
         catch (error) {
            return error
        }
    }
);

// think for changing the body 

export const updateBodyAsync = createAsyncThunk(
    'tasks/updateBody',
    async({taskId , taskBody})=>{
       
        const data = await updateBody(taskId,taskBody);
        
        return data;

    }
)

// Define the thunk for deleting a task with the user ID
export const deleteTaskAsync = createAsyncThunk(
    'tasks/deleteTask',
    async (id) => {
       
        try {
            const data = await deleteTask(id);

        
        return data;
            
        } catch (error) {
            return error;
        }
       
        
    }
);

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        logout(state){
           
                state.data=[];

        }
    },
    extraReducers: (builder) => {
        // Handle fetchAllTaskAsync
        builder
            .addCase(fetchAllTaskAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllTaskAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
        state.data = action.payload.map(task => {
          // Check deadline and update status if necessary for immediate feedback
          if (new Date(task.deadline) < Date.now() && task.status !== 'backlog' && task.status !== 'complete') {
            task.status = 'backlog';
          }
          else if(new Date(task.deadline) > Date.now() && task.status !== 'pending' && task.status !== 'complete' && task.status1=='started'){
            task.status='pending';
          }
          return task;
        });
            })
            .addCase(fetchAllTaskAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });

        // Handle addTaskAsync
        builder
            .addCase(addTaskAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addTaskAsync.fulfilled, (state,action) => {
                state.status = 'succeeded';
                 state.data.push(action.payload.task);
            })
            .addCase(addTaskAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });

        // Handle updateTaskAsync
        builder
            .addCase(updateTaskAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateTaskAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { status, Ids } = action.payload;
                state.data = state.data.map(task =>
                  Ids.includes(task._id) ? { ...task, status } : task
                );
              })
            .addCase(updateTaskAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });

            builder
            .addCase(updateBodyAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(updateBodyAsync.fulfilled,(state,action)=>{
                state.status = 'succeeded';
                const index = state.data.findIndex(data => data._id === action.payload.task._id);
                if (index !== -1) {
                    state.data[index] = action.payload.task;
                    
                }
               
            
            })
            .addCase(updateBodyAsync.rejected,(state,action)=>{
                state.status='rejected';
                state.error=action.error.message;
            })


        // Handle deleteTaskAsync
        builder
            .addCase(deleteTaskAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteTaskAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = state.data.filter(task => task._id !== action.payload.id);
              })
            .addCase(deleteTaskAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const {logout} = tasksSlice.actions;
export default tasksSlice.reducer;

