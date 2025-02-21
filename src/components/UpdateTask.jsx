import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../providers/AuthProvider';

const UpdateTask = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [task, setTask] = useState({});

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/all-task/${id}`);
                setTask(response.data);
            } catch (err) {
                console.error('Error fetching task:', err);
            }
        };

        fetchTask();
    }, [id]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedTask = {
            ...task, // Include existing data
            timestamp: new Date().toISOString(), // Update timestamp
        };

        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/update/${id}`, updatedTask);
            navigate('/my-task');
            toast.success('Task updated successfully');
        } catch (err) {
            console.error("Error updating task:", err);
            toast.error("Failed to update task");
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-6 p-6 bg-gray-200 shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Update Task</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={task.title || ""}
                        onChange={handleChange}
                        required
                        placeholder="Enter Task Title"
                        className="w-full px-3 py-2 border rounded-md shadow-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                        name="category"
                        value={task.category || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md shadow-sm"
                    >
                        <option value="">Select a category</option>
                        <option value="To-Do">To-Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Your Name</label>
                        <input
                            type="text"
                            value={user?.displayName || ""}
                            readOnly
                            className="w-full px-3 py-2 border rounded-md shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Your Email</label>
                        <input
                            type="email"
                            value={user?.email || ""}
                            readOnly
                            className="w-full px-3 py-2 border rounded-md shadow-sm"
                        />
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="w-full sm:w-auto px-6 py-2 bg-gray-500 hover:bg-gray-600 text-base-200 rounded-md shadow-sm">
                        Update Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateTask;
