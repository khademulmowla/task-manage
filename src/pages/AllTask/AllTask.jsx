
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllTask = () => {
    const [todoTasks, setTodoTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks by category
        const fetchTasks = async (category) => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${category}`);
                return response.data;
            } catch (err) {
                console.error(`Error fetching ${category} tasks:`, err);
            }
        };

        // Fetch tasks for each category
        const fetchAllTasks = async () => {
            const todo = await fetchTasks('To-Do');
            const inProgress = await fetchTasks('In Progress');
            const done = await fetchTasks('Done');
            setTodoTasks(todo);
            setInProgressTasks(inProgress);
            setDoneTasks(done);
        };

        fetchAllTasks();
    }, []);

    return (
        <div className="max-w-4xl mx-auto my-6 p-6 bg-gray-100 shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">All Tasks</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* To-Do Tasks */}
                <div className="task-column bg-gray-200 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2 text-center">To-Do</h2>
                    {todoTasks.map((task) => (
                        <div key={task._id} className="task-card bg-white p-4 rounded-lg shadow-md mb-4">
                            <h3 className="font-semibold">{task.title}</h3>
                            <p className="text-sm text-gray-600">{task.category}</p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Created:</span>{' '}
                                {new Date(task.timestamp).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>

                {/* In Progress Tasks */}
                <div className="task-column bg-gray-200 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2 text-center">In Progress</h2>
                    {inProgressTasks.map((task) => (
                        <div key={task._id} className="task-card bg-white p-4 rounded-lg shadow-md mb-4">
                            <h3 className="font-semibold">{task.title}</h3>
                            <p className="text-sm text-gray-600">{task.category}</p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Created:</span>{' '}
                                {new Date(task.timestamp).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Done Tasks */}
                <div className="task-column bg-gray-200 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2 text-center">Done</h2>
                    {doneTasks.map((task) => (
                        <div key={task._id} className="task-card bg-white p-4 rounded-lg shadow-md mb-4">
                            <h3 className="font-semibold">{task.title}</h3>
                            <p className="text-sm text-gray-600">{task.category}</p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Created:</span>{' '}
                                {new Date(task.timestamp).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllTask;

