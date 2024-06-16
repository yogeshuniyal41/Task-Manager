// Import the apiRequest function
import { useSelector } from 'react-redux';
import { apiRequest } from '../utils/utilAPI';
import {BASE_URL } from '../baseurl'


console.log(BASE_URL)

// TASK APIs
export const fetchAllTasks = async (userId) => {
    try {
       
        const response = await apiRequest(`${BASE_URL}tasks?email=${userId}`, {
            method: 'GET',

        });
        // console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
       
        return data;
    } catch (error) {
        console.error('Error fetching all tasks:', error);
        throw error;
    }
};

export const updateTask = async ( taskIds, status) => {
    
    try {
        const response = await apiRequest(`${BASE_URL}task/update/status/${status}`, {
            method: 'PUT',
            body: JSON.stringify(taskIds),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error updating task with `, error);
        throw error;
    }
};

export const updateBody = async ( taskId, taskBody) => {
    
    try {
        const response = await apiRequest(`${BASE_URL}task/update/body/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify(taskBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error updating task with `, error);
        throw error;
    }
};


export const addTask = async ( task) => {
    try {
        // console.log(task)
        const response = await apiRequest(`${BASE_URL}task/add`, {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding task:', error);
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        const response = await apiRequest(`${BASE_URL}task/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error deleting task with ID ${id}:`, error);
        throw error;
    }
};
