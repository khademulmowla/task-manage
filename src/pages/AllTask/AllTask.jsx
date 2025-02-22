import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";

const AllTask = () => {
    const [tasks, setTasks] = useState({
        "To-Do": [],
        "In Progress": [],
        "Done": [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const categories = ["To-Do", "In Progress", "Done"];
                const updatedTasks = {};
                for (let category of categories) {
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${category}`);
                    updatedTasks[category] = response.data;
                }
                setTasks(updatedTasks);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching tasks:", err);
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);
    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="max-w-4xl mx-auto my-6 p-6 bg-gray-100 shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">All Tasks</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(tasks).map((category) => (
                    <div key={category} className="task-column bg-gray-200 p-4 rounded-lg shadow-md min-h-[300px]">
                        <h2 className="text-xl font-semibold mb-2 text-center">{category}</h2>
                        {tasks[category].map((task) => (
                            <div key={task._id} className="task-card bg-white p-4 rounded-lg shadow-md mb-4">
                                <h3 className="font-semibold">{task.title}</h3>
                                <p className="text-sm text-gray-600">{task.category}</p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Created:</span>{" "}
                                    {new Date(task.timestamp).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllTask;
