import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../providers/AuthProvider';

const MyTask = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetchTasks();
        }
    }, [user]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/all-task/${user.email}`);
            setTasks(response.data);
        } catch (err) {
            console.error('Error fetching tasks:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/all-task/${id}`);
            toast.success('Task deleted successfully');
            fetchTasks();
        } catch (err) {
            toast.error('Failed to delete task');
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-6 p-6 bg-gray-100 shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">My Tasks</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map((task) => (
                    <div key={task._id} className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
                        <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">Category:</span> {task.category}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Created:</span>{' '}
                            {new Date(task.timestamp).toLocaleString()}
                        </p>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => handleDelete(task._id)}
                                className="btn btn-sm bg-red-800 text-white hover:bg-red-400"
                            >
                                Delete
                            </button>
                            <Link to={`/update/${task._id}`}>
                                <button className="btn btn-sm bg-green-800 text-white hover:bg-yellow-600">Update</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default MyTask;