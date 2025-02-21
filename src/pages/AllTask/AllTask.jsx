
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllTask = () => {
    const [tasks, setTasks] = useState([]);

    // Fetch all tasks from the backend
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/all-task`);
                setTasks(response.data);
            } catch (err) {
                console.error('Error fetching tasks:', err);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div className="max-w-4xl mx-auto my-6 p-6 bg-gray-100 shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">All Tasks</h1>
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllTask;