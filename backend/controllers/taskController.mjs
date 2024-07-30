import { Task , User } from '../models/index.mjs';


export const getTasks = async (req, res) => {
    const { email } = req.query;
    
   

    try {
        const user = await User.findOne({ "user":email });
        
        if (!user) {
            
            return res.status(404).json({ error: "User not found" });
        }
        
        const tasks = await Task.find({ user:user._id});
        
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const addTask = async (req, res) => {
    const { taskName, taskDescription, taskDeadline, user } = req.body;
    
    try {
      const result = await User.findOne({ user }); // Assuming 'username' is the correct field to query
  
      if (!result) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const deadlineDate = new Date(taskDeadline);
        const now = new Date();

        // Combine date from taskDeadline with current time
        deadlineDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds())

        let status ;
        if(new Date(deadlineDate) > Date.now()){
            status='pending'
        }
        else status='backlog';

      const newTask = new Task({
        name: taskName,
        description: taskDescription,
        deadline: deadlineDate, // Ensure this is a valid date format
        createdAt: Date.now(),
        user: result._id,
        status,
      });
  
      await newTask.save();
      res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  export const updateTaskBody = async (req, res) => {
    const id = req.params.taskId;
    const taskBody = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, taskBody, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        
        const deadline = new Date(updatedTask.deadline);
        const now = new Date();

        if (deadline > now && updatedTask.status !== 'complete' && updatedTask.status !== 'started') {
            updatedTask.status = 'pending';
        } else if (deadline < now && updatedTask.status !== 'complete') {
            updatedTask.status = 'backlog';
        }

        await updatedTask.save();
        

        res.json({ msg: "Success", task: updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
    

// Assuming Task is a Mongoose model for the tasks collection


export const updateTask = async (req, res) => {
    
    const status = req.params.status; // Get the new status from the request parameters
    const taskIds = req.body; // Assuming task IDs are passed in the request body

    

    try {
        // Filter for tasks where taskId is in the array of task IDs
        const filter = { _id: { $in: taskIds } };

        // Update operation to set the new status
        const update = { $set: { "status": status } };

        // Use updateMany to update the tasks
        const updatedTask = await Task.updateMany(filter, update);

        // Check if any tasks were updated
        if (updatedTask.matchedCount === 0) {
            return res.status(404).json({ error: "Tasks not found" });
        }

        // Return success response with count of updated tasks
        res.status(200).json({
            status: status,
            Ids: taskIds
        });
    } catch (error) {
        console.error('Error updating tasks:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteTask = async (req, res) => {
    const taskId = req.params.id;
    

    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json({ id: taskId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
